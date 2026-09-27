#!/usr/bin/env node
/**
 * Generate public/og-image.png (1200×630), the link-preview image used by Facebook, LinkedIn, X, etc.
 * Runs after sync-content.mjs so the numbers and the heatmap match the current review data.
 * Output is git-ignored; it is rebuilt on every build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SITE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = (f) => JSON.parse(fs.readFileSync(path.join(SITE_DIR, 'src/data', f), 'utf8'));
const heatmap = data('heatmap.json');
const findings = data('findings.json');

const W = 1200, H = 630;
const C = {
	bg: '#15171c', panel: '#1d2027', text: '#f2f1ec', muted: '#9ea3ad', accent: '#8ab4ff',
	critical: '#ef5b5b', major: '#f5a524', minor: '#7b93f6', none: '#3a3e48',
};
const FONT = "'DejaVu Sans', 'Liberation Sans', Arial, Helvetica, sans-serif";
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const nSeg = heatmap.reduce((n, d) => n + d.segments.length, 0);
const crit = findings.filter((f) => f.severity === 'critical').length;
const stats = [
	[String(heatmap.length), 'AI guides reviewed'],
	[String(nSeg), 'segments'],
	[String(findings.length), 'findings'],
	[String(crit), 'critical'],
];

// Heatmap: one row per document, one tile per segment, coloured by worst finding.
const tile = 26, gap = 5, x0 = 64, y0 = 404;
const labels = ['01', '02', '03', '04'];
let tiles = '';
heatmap.forEach((doc, r) => {
	const y = y0 + r * (tile + gap);
	tiles += `<text x="${x0}" y="${y + tile - 7}" font-size="15" fill="${C.muted}" font-family="${FONT}">${labels[r] ?? ''}</text>`;
	doc.segments.forEach((s, i) => {
		const x = x0 + 34 + i * (tile + gap);
		const fill = C[s.worst] ?? C.none;
		tiles += s.worst === 'none'
			? `<rect x="${x}" y="${y}" width="${tile}" height="${tile}" rx="5" fill="none" stroke="${C.none}" stroke-width="2" stroke-dasharray="4 3"/>`
			: `<rect x="${x}" y="${y}" width="${tile}" height="${tile}" rx="5" fill="${fill}" fill-opacity="0.85"/>`;
	});
});

const statsSvg = stats
	.map(([v, k], i) => {
		const x = 64 + i * 215;
		return `<text x="${x}" y="330" font-size="46" font-weight="700" fill="${C.text}" font-family="${FONT}">${esc(v)}</text>
		<text x="${x}" y="360" font-size="19" fill="${C.muted}" font-family="${FONT}">${esc(k)}</text>`;
	})
	.join('');

const legend = [['critical', C.critical], ['major', C.major], ['minor', C.minor]]
	.map(([k, c], i) => `<rect x="${880 + i * 100}" y="${y0 + 4}" width="16" height="16" rx="3" fill="${c}"/>
		<text x="${902 + i * 100}" y="${y0 + 18}" font-size="16" fill="${C.muted}" font-family="${FONT}">${k}</text>`)
	.join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
	<rect width="${W}" height="${H}" fill="${C.bg}"/>
	<rect x="0" y="0" width="${W}" height="8" fill="${C.accent}"/>
	<text x="64" y="104" font-size="22" letter-spacing="3" fill="${C.accent}" font-family="${FONT}">ASSEMBLY  ×  FORTRAN</text>
	<text x="64" y="170" font-size="58" font-weight="700" fill="${C.text}" font-family="${FONT}">Learning both, the hard way</text>
	<text x="64" y="222" font-size="26" fill="${C.muted}" font-family="${FONT}">Adversarial review of AI-generated guides, then a tiny</text>
	<text x="64" y="256" font-size="26" fill="${C.muted}" font-family="${FONT}">retro-constrained game you can play in the browser</text>
	${statsSvg}
	${legend}
	${tiles}
	<text x="64" y="${H - 34}" font-size="22" fill="${C.text}" font-family="${FONT}">kairin.github.io/000-111-learn</text>
	<text x="${W - 64}" y="${H - 34}" text-anchor="end" font-size="18" fill="${C.muted}" font-family="${FONT}">review tracker · GitHub Pages</text>
</svg>`;

const out = path.join(SITE_DIR, 'public/og-image.png');
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`og-image: wrote ${path.relative(SITE_DIR, out)} (${W}×${H})`);
