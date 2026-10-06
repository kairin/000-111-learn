#!/usr/bin/env node
/**
 * Sync ../review into this Astro/Starlight site. Runs before `astro dev` / `astro build`.
 *
 *   learn/*.md, review/**.md -> src/content/docs/**  (Starlight pages; links rewritten to site routes)
 *   learn/*.json             -> src/data/*.json      (segments, parts of speech, the two dictionaries)
 *   learn/images/*           -> src/assets/learn/*   (photos; Astro makes optimized copies)
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
const LEARN = path.join(REPO, 'learn');
const LEARN_IMAGES = path.join(LEARN, 'images');
const ASSETS_LEARN = path.join(SITE_DIR, 'src/assets/learn');
const DOCS = path.join(SITE_DIR, 'src/content/docs');
const DATA = path.join(SITE_DIR, 'src/data');
const PUBLIC_SOURCES = path.join(SITE_DIR, 'public/sources');
const SEVERITIES = ['critical', 'major', 'minor'];

const rel = (p) => path.relative(REPO, p).split(path.sep).join('/');
const readJson = (p, fallback) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : fallback);
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const routeUrl = (slug) => `${BASE}/${slug ? slug + '/' : ''}`;
const githubUrl = (p, kind = 'blob') => encodeURI(`${REPO_URL}/${kind}/main/${rel(p)}`); // file names can contain spaces
const warnings = [];

// ------------------------------------------------------------ route table
/** absolute source path -> { slug, out, order?, label? } */
const routes = new Map();
function add(src, slug, extra = {}) {
	routes.set(path.resolve(src), { slug, out: path.join(DOCS, (slug || 'index') + '.md'), ...extra });
}

const documents = readJson(path.join(REVIEW, 'findings/documents.json'), []);
const shortName = (file) => documents.find((d) => path.basename(d.source) === file || path.basename(d.review) === file)?.short;

// Learning content (the primary content of the site)
add(path.join(LEARN, 'start-here.md'), 'start-here', { label: 'Start here: you can already read' });
add(path.join(LEARN, 'a-side.md'), 'a', { label: 'A side overview', side: 'a' });
add(path.join(LEARN, 'b-side.md'), 'b', { label: 'B side overview', side: 'b' });

add(path.join(REVIEW, 'README.md'), 'process', { label: 'Process' });
add(path.join(REVIEW, 'plan/PLAN.md'), 'plan', { order: 1, label: 'Plan' });
add(path.join(REVIEW, 'plan/DECISIONS.md'), 'plan/decisions', { order: 2, label: 'Decisions' });
for (const f of listFiles(path.join(REVIEW, 'plan/sessions'), '.md')) {
	add(f, `plan/sessions/${slugify(path.basename(f, '.md'))}`, { order: 3, label: `Session ${path.basename(f, '.md')}` });
}
for (const f of listFiles(path.join(REVIEW, 'adversarial-review-pass1'), '.md')) {
	const n = path.basename(f).slice(0, 2);
	add(f, `reviews/${slugify(path.basename(f, '.md').replace(/\.review$/, ''))}`, {
		label: n === '00' ? (/snes/i.test(f) ? '00 Summary: SNES video guides' : /video/i.test(f) ? '00 Summary: video guides' : '00 Summary: first four guides') : `${n} ${shortName(path.basename(f)) ?? path.basename(f)}`,
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
function resolveHref(href, fromFile, outFile) {
	// A site path written as "/a/" in learn/*.md gets the base path.
	if (href.startsWith('/') && !href.startsWith(BASE + '/')) return BASE + href;
	if (/^([a-z]+:|#|\/)/i.test(href)) return href;
	const [p, frag] = href.split('#');
	const target = path.resolve(path.dirname(fromFile), decodeURIComponent(p));
	const hash = frag ? `#${frag}` : '';
	// An image from learn/images: point to its copy in src/assets/learn (Astro optimizes it).
	if (target.startsWith(LEARN_IMAGES + path.sep) && outFile) {
		return path.relative(path.dirname(outFile), path.join(ASSETS_LEARN, path.basename(target))).split(path.sep).join('/');
	}
	const r = routes.get(target) || routes.get(target.replace(/\/$/, ''));
	if (r) return routeUrl(r.slug) + hash;
	if (target.endsWith('.html') && htmlSources.includes(target)) return `${BASE}/sources/${path.basename(target)}`;
	if (target.startsWith(REPO) && fs.existsSync(target)) {
		return githubUrl(target, fs.statSync(target).isDirectory() ? 'tree' : 'blob') + hash;
	}
	warnings.push(`unresolved link "${href}" in ${rel(fromFile)}`);
	return href;
}

function rewriteLinks(md, fromFile, outFile) {
	// Leave fenced code blocks untouched.
	return md
		.split(/(^```[\s\S]*?^```)/m)
		.map((chunk, i) =>
			i % 2 ? chunk : chunk.replace(/(\]\()([^)\s]+)(\))/g, (_, a, href, b) => a + resolveHref(href, fromFile, outFile) + b),
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

const learnSegments = readJson(path.join(LEARN, 'segments.json'), []);
// The YouTube video behind each reviewed document (the prompt of the owner).
const videos = readJson(path.join(REVIEW, 'findings/videos.json'), {});
const videoNote = (file) => {
	const v = videos[file];
	return v
		? `:::tip[Source video]\n[${v.title}](https://www.youtube.com/watch?v=${v.id}) by ${v.channel} (${v.duration}). The owner gave this video in the prompt for this document.\n:::\n\n`
		: '';
};

// ------------------------------------------------------------ write pages
fs.rmSync(DOCS, { recursive: true, force: true });
fs.rmSync(DATA, { recursive: true, force: true });
fs.rmSync(PUBLIC_SOURCES, { recursive: true, force: true });
fs.mkdirSync(DATA, { recursive: true });
// Images of the learning content (for example the A-side cassette photo).
fs.rmSync(ASSETS_LEARN, { recursive: true, force: true });
if (fs.existsSync(LEARN_IMAGES)) fs.cpSync(LEARN_IMAGES, ASSETS_LEARN, { recursive: true });
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
		? `:::note\nGenerated by \`review/segments/split_documents.py\` from [${rel(src)}](${githubUrl(src)}). Do not edit the copy. Each run replaces it.\n:::\n\n`
		: '';
	let tail = '';
	if (r.side) {
		tail = '\n' + learnSegments
			.map((sg) => `- [${sg.title}](${BASE}/${r.side}/${sg.id}/): ${sg.question}`)
			.join('\n') + '\n';
	}
	const vnote = path.dirname(src) === SEG_DIR ? videoNote(path.basename(src)) : '';
	const out = `---\n${fm.join('\n')}\n---\n\n${note}${vnote}${metaTable(meta, src)}${rewriteLinks(body, src, r.out)}${tail}`;
	fs.mkdirSync(path.dirname(r.out), { recursive: true });
	fs.writeFileSync(r.out, out);
}

// ------------------------------------------------------------ data
const manifest = readJson(path.join(SEG_DIR, 'manifest.json'), { documents: [] });
const overrides = readJson(path.join(REVIEW, 'findings/status.json'), {});
const findings = [];
for (const f of listFiles(path.join(REVIEW, 'findings'), '.json').filter((f) => /\/pass\d+[^/]*\.json$/.test(f))) {
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
write('learn-segments.json', learnSegments);
write('parts-of-speech.json', readJson(path.join(LEARN, 'parts-of-speech.json'), []));
write('vocab-a.json', readJson(path.join(LEARN, 'vocabulary/assembly.json'), { words: [], size: [] }));
write('vocab-b.json', readJson(path.join(LEARN, 'vocabulary/fortran.json'), { words: [], size: [] }));
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
	const body = `${videoNote(path.basename(f))}${doc ? `**Question it answers:** ${doc.question}\n\n` : ''}Gemini wrote this interactive page. The project keeps it **unchanged** as evidence for the review. The review examines its quiz and its charts too.

<a class="sl-link-button" href="${BASE}/sources/${path.basename(f)}" target="_blank" rel="noopener">Open the original page ↗</a>

- **Review:** ${doc ? `[pass-1 review](${doc.reviewHref})` : '—'}
- **Document parts:** [start at part 01](${segHref})
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
