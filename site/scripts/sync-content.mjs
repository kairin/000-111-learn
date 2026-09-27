#!/usr/bin/env node
/**
 * Sync ../review into this Astro/Starlight site. Runs before `astro dev` / `astro build`.
 *
 *   review/**.md             -> src/content/docs/**  (Starlight pages; links rewritten to site routes)
 *   review/segments/*.html   -> public/sources/*.html (original interactive pages, copied verbatim)
 *   review/findings/*.json   -> src/data/*.json      (findings with status overrides, heatmap, progress)
 *
 * All three output folders are generated and git-ignored. Edit review/, never the outputs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE, REPO_URL } from '../site.config.mjs';

const SITE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(SITE_DIR, '..');
const REVIEW = path.join(REPO, 'review');
const DOCS = path.join(SITE_DIR, 'src/content/docs');
const DATA = path.join(SITE_DIR, 'src/data');
const PUBLIC_SOURCES = path.join(SITE_DIR, 'public/sources');
const SEVERITIES = ['critical', 'major', 'minor'];

const rel = (p) => path.relative(REPO, p).split(path.sep).join('/');
const readJson = (p, fallback) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : fallback);
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const routeUrl = (slug) => `${BASE}/${slug ? slug + '/' : ''}`;
const githubUrl = (p, kind = 'blob') => `${REPO_URL}/${kind}/main/${rel(p)}`;
const warnings = [];

// ------------------------------------------------------------ route table
/** absolute source path -> { slug, out, order?, label? } */
const routes = new Map();
function add(src, slug, extra = {}) {
	routes.set(path.resolve(src), { slug, out: path.join(DOCS, (slug || 'index') + '.md'), ...extra });
}

const documents = readJson(path.join(REVIEW, 'findings/documents.json'), []);
const shortName = (file) => documents.find((d) => path.basename(d.source) === file || path.basename(d.review) === file)?.short;

add(path.join(REVIEW, 'README.md'), 'process', { label: 'Process' });
add(path.join(REVIEW, 'plan/PLAN.md'), 'plan', { order: 1, label: 'Plan' });
add(path.join(REVIEW, 'plan/DECISIONS.md'), 'plan/decisions', { order: 2, label: 'Decisions' });
for (const f of listFiles(path.join(REVIEW, 'plan/sessions'), '.md')) {
	add(f, `plan/sessions/${slugify(path.basename(f, '.md'))}`, { order: 3, label: `Session ${path.basename(f, '.md')}` });
}
for (const f of listFiles(path.join(REVIEW, 'adversarial-review-pass1'), '.md')) {
	const n = path.basename(f).slice(0, 2);
	add(f, `reviews/${slugify(path.basename(f, '.md').replace(/\.review$/, ''))}`, {
		label: n === '00' ? '00 Summary' : `${n} ${shortName(path.basename(f)) ?? path.basename(f)}`,
	});
}
add(path.join(REVIEW, 'segments/README.md'), 'segments');
add(path.join(REVIEW, 'findings/segment-map.md'), 'segments/segment-map');

const SEG_DIR = path.join(REVIEW, 'segments');
const htmlSources = [];
for (const f of listFiles(SEG_DIR)) {
	const base = path.basename(f);
	if (f.endsWith('.md') && base !== 'README.md') add(f, `sources/${slugify(path.basename(f, '.md'))}`, { label: shortName(base) });
	if (f.endsWith('.html')) htmlSources.push(f);
}
for (const d of fs.readdirSync(SEG_DIR, { withFileTypes: true })) {
	if (!d.isDirectory()) continue;
	const dir = path.join(SEG_DIR, d.name);
	routes.set(dir, { slug: 'segments', dirOnly: true });
	for (const f of listFiles(dir, '.md')) {
		add(f, `segments/${d.name}/${slugify(path.basename(f, '.md'))}`, { segment: true });
	}
}

function listFiles(dir, ext) {
	if (!fs.existsSync(dir)) return [];
	return fs
		.readdirSync(dir, { withFileTypes: true })
		.filter((d) => d.isFile() && (!ext || d.name.endsWith(ext)))
		.map((d) => path.join(dir, d.name))
		.sort();
}

// ------------------------------------------------------------ links
function resolveHref(href, fromFile) {
	if (/^([a-z]+:|#|\/)/i.test(href)) return href;
	const [p, frag] = href.split('#');
	const target = path.resolve(path.dirname(fromFile), decodeURIComponent(p));
	const hash = frag ? `#${frag}` : '';
	const r = routes.get(target) || routes.get(target.replace(/\/$/, ''));
	if (r) return routeUrl(r.slug) + hash;
	if (target.endsWith('.html') && htmlSources.includes(target)) return `${BASE}/sources/${path.basename(target)}`;
	if (target.startsWith(REPO) && fs.existsSync(target)) {
		return githubUrl(target, fs.statSync(target).isDirectory() ? 'tree' : 'blob') + hash;
	}
	warnings.push(`unresolved link "${href}" in ${rel(fromFile)}`);
	return href;
}

function rewriteLinks(md, fromFile) {
	// Leave fenced code blocks untouched.
	return md
		.split(/(^```[\s\S]*?^```)/m)
		.map((chunk, i) =>
			i % 2 ? chunk : chunk.replace(/(\]\()([^)\s]+)(\))/g, (_, a, href, b) => a + resolveHref(href, fromFile) + b),
		)
		.join('');
}

// ------------------------------------------------------------ front matter
function splitFrontMatter(text) {
	const m = text.match(/^---\n([\s\S]*?)\n---\n/);
	if (!m) return [{}, text];
	const meta = {};
	for (const line of m[1].split('\n')) {
		const i = line.indexOf(':');
		if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, '$1');
	}
	return [meta, text.slice(m[0].length)];
}

function metaTable(meta, fromFile) {
	const rows = Object.entries(meta).map(([k, v]) => {
		let cell = v.replace(/\|/g, '\\|');
		const pathMatch = v.match(/^(\.\.?\/\S+?\.(?:md|html))(.*)$/);
		if (pathMatch) cell = `[${pathMatch[1]}](${resolveHref(pathMatch[1], fromFile)})${pathMatch[2]}`;
		if (k === 'findings') {
			const ids = v.replace(/[[\]]/g, '').split(',').map((s) => s.trim()).filter(Boolean);
			cell = ids.length ? ids.map((id) => `[${id}](${BASE}/findings/#q=${id})`).join(' ') : '—';
		}
		return `| ${k} | ${cell} |`;
	});
	return rows.length ? `<details class="meta"><summary>Metadata</summary>\n\n| Field | Value |\n|---|---|\n${rows.join('\n')}\n\n</details>\n\n` : '';
}

const yamlStr = (s) => JSON.stringify(String(s));

// ------------------------------------------------------------ write pages
fs.rmSync(DOCS, { recursive: true, force: true });
fs.rmSync(DATA, { recursive: true, force: true });
fs.rmSync(PUBLIC_SOURCES, { recursive: true, force: true });
fs.mkdirSync(DATA, { recursive: true });
fs.mkdirSync(PUBLIC_SOURCES, { recursive: true });

// A route with child routes must be <slug>/index.md so it sits inside its sidebar group.
const allSlugs = [...routes.values()].map((r) => r.slug);
for (const r of routes.values()) {
	if (r.slug && allSlugs.some((s) => s.startsWith(r.slug + '/'))) r.out = path.join(DOCS, r.slug, 'index.md');
}

for (const [src, r] of routes) {
	if (r.dirOnly) continue;
	const [meta, body0] = splitFrontMatter(fs.readFileSync(src, 'utf8'));
	let body = body0.replace(/^\s+/, '');
	let title = path.basename(src, '.md');
	const h1 = body.match(/^# (.+)\n/);
	if (h1) {
		title = h1[1].replace(/[*`]/g, '').trim();
		body = body.slice(h1[0].length);
	}
	const fm = [`title: ${yamlStr(title)}`, `editUrl: ${yamlStr(githubUrl(src, 'edit'))}`];
	const label = r.segment ? `${path.basename(src).slice(0, 2)} ${title}` : r.label;
	const sb = [label && `  label: ${yamlStr(label)}`, r.order && `  order: ${r.order}`].filter(Boolean);
	if (sb.length) fm.push(`sidebar:\n${sb.join('\n')}`);
	const generated = src.includes('/segments/') && (r.segment || src.endsWith('README.md')) || src.endsWith('segment-map.md');
	const note = generated
		? `:::note\nGenerated by \`review/segments/split_documents.py\` from [${rel(src)}](${githubUrl(src)}). Don't edit it directly.\n:::\n\n`
		: '';
	const out = `---\n${fm.join('\n')}\n---\n\n${note}${metaTable(meta, src)}${rewriteLinks(body, src)}`;
	fs.mkdirSync(path.dirname(r.out), { recursive: true });
	fs.writeFileSync(r.out, out);
}

// ------------------------------------------------------------ data
const manifest = readJson(path.join(SEG_DIR, 'manifest.json'), { documents: [] });
const overrides = readJson(path.join(REVIEW, 'findings/status.json'), {});
const findings = [];
for (const f of listFiles(path.join(REVIEW, 'findings'), '.json').filter((f) => /\/pass\d+\.json$/.test(f))) {
	findings.push(...readJson(f, []));
}
const segOf = {};
for (const d of manifest.documents) {
	for (const s of d.segments) {
		const r = routes.get(path.join(SEG_DIR, s.file));
		for (const id of s.findings) {
			(segOf[id] ??= []).push({ n: s.file.split('/')[1].slice(0, 2), title: s.title, href: r ? routeUrl(r.slug) : null });
		}
	}
}
const docRoute = (source) => {
	const src = path.join(SEG_DIR, source);
	return source.endsWith('.html') ? routeUrl(`sources/${slugify(path.basename(source, '.html'))}`) : routeUrl(routes.get(src)?.slug);
};
for (const f of findings) {
	const o = overrides[f.id] || {};
	f.status = o.status || f.status;
	f.note = o.note ?? f.note ?? '';
	f.updated = o.updated ?? '';
	f.segments = segOf[f.id] || [];
	f.docHref = docRoute(f.source);
}
const fmap = Object.fromEntries(findings.map((f) => [f.id, f]));
const worst = (ids) => ids.reduce((w, id) => Math.min(w, SEVERITIES.indexOf(fmap[id]?.severity ?? 'minor')), 99);

const heatmap = manifest.documents.map((d) => ({
	source: d.source,
	title: d.title,
	href: docRoute(d.source),
	documentFindings: d.document_findings,
	segments: d.segments.map((s) => ({
		n: s.file.split('/')[1].slice(0, 2),
		title: s.title,
		href: routeUrl(routes.get(path.join(SEG_DIR, s.file))?.slug),
		count: s.findings.length,
		worst: s.findings.length ? SEVERITIES[worst(s.findings)] : 'none',
	})),
}));

for (const d of documents) {
	d.sourceHref = docRoute(d.source);
	d.reviewHref = routeUrl(routes.get(path.join(REVIEW, d.review))?.slug);
	if (d.source.endsWith('.html')) d.originalHref = `${BASE}/sources/${d.source}`;
}

// Progress: checklist + log parsed from review/README.md
const readme = fs.readFileSync(path.join(REVIEW, 'README.md'), 'utf8');
const sectionOf = (h) => (readme.match(new RegExp(`^## ${h}\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))`, 'm')) || [, ''])[1];
const inlineMd = (s) => rewriteLinks(s, path.join(REVIEW, 'README.md'));
const checklist = [];
for (const line of sectionOf('Status and next steps').split('\n')) {
	const m = line.match(/^- \[( |x)\] (.*)$/);
	if (m) checklist.push({ done: m[1] === 'x', text: inlineMd(m[2]), sub: [] });
	else if (/^\s+- /.test(line) && checklist.length) checklist.at(-1).sub.push(inlineMd(line.replace(/^\s+- /, '')));
}
const log = sectionOf('Log')
	.split('\n')
	.filter((l) => /^\| \d{4}-/.test(l))
	.map((l) => l.split('|').slice(1, -1).map((c) => inlineMd(c.trim())))
	.map(([date, step, output]) => ({ date, step, output }));

const write = (name, obj) => fs.writeFileSync(path.join(DATA, name), JSON.stringify(obj, null, 1));
write('findings.json', findings);
write('documents.json', documents);
write('heatmap.json', heatmap);
write('progress.json', { checklist, log });
write('site.json', {
	statusEditUrl: githubUrl(path.join(REVIEW, 'findings/status.json'), 'edit'),
	statusFile: 'review/findings/status.json',
});

// ------------------------------------------------------------ original HTML pages + stub docs pages
for (const f of htmlSources) {
	fs.copyFileSync(f, path.join(PUBLIC_SOURCES, path.basename(f)));
	const doc = documents.find((d) => d.source === path.basename(f));
	const slug = `sources/${slugify(path.basename(f, '.html'))}`;
	const title = doc ? `${doc.short} (${path.basename(f)})` : path.basename(f);
	const seg = manifest.documents.find((d) => d.source === path.basename(f));
	const segHref = seg ? routeUrl(routes.get(path.join(SEG_DIR, seg.segments[0].file))?.slug) : routeUrl('segments');
	const body = `${doc ? `**Question it answers:** ${doc.question}\n\n` : ''}This is an interactive page generated by Gemini, kept **unchanged** as review evidence. Its quiz and charts are among the things under review.

<a class="sl-link-button" href="${BASE}/sources/${path.basename(f)}" target="_blank" rel="noopener">Open the original page ↗</a>

- **Review:** ${doc ? `[pass-1 review](${doc.reviewHref})` : '—'}
- **Segments:** [start at segment 01](${segHref})
- **Source file:** [${rel(f)}](${githubUrl(f)})
`;
	fs.mkdirSync(path.join(DOCS, 'sources'), { recursive: true });
	fs.writeFileSync(
		path.join(DOCS, `${slug}.md`),
		`---\ntitle: ${yamlStr(title)}\neditUrl: false\nsidebar:\n  label: ${yamlStr(doc ? `${doc.short} (interactive)` : title)}\n---\n\n${body}`,
	);
}
if (warnings.length) console.warn(`sync-content: ${warnings.length} warning(s)\n  ` + warnings.join('\n  '));
console.log(`sync-content: ${routes.size} routes, ${findings.length} findings, ${htmlSources.length} original pages`);
