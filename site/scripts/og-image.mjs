#!/usr/bin/env node
/**
 * Generate public/og-image.png (1200×630), the link-preview image for Facebook, LinkedIn, X and chat apps.
 * It shows the A side (Assembly) and the B side (Fortran) with the size of each dictionary.
 * Runs after sync-content.mjs, so the numbers come from learn/vocabulary/*.json. The output is git-ignored.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SITE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = (f) => JSON.parse(fs.readFileSync(path.join(SITE_DIR, 'src/data', f), 'utf8'));
const vocab = { a: data('vocab-a.json'), b: data('vocab-b.json') };
const segments = data('learn-segments.json');

const W = 1200, H = 630;
const C = { bg: '#14161b', text: '#f2f1ec', muted: '#9ea3ad', a: '#f0a33a', aLow: '#2e2210', b: '#3cc6b6', bLow: '#0e2c29' };
const FONT = "'DejaVu Sans', 'Liberation Sans', Arial, Helvetica, sans-serif";
const MONO = "'DejaVu Sans Mono', 'Liberation Mono', monospace";
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function side(x, key, letter, name, tagline, code) {
	const col = C[key], low = C[key + 'Low'];
	const size = vocab[key].size[0];
	const lines = code
		.map((l, i) => `<text x="${x + 32}" y="${402 + i * 30}" font-size="22" fill="${C.text}" font-family="${MONO}">${esc(l)}</text>`)
		.join('');
	return `
	<rect x="${x}" y="150" width="520" height="380" rx="18" fill="${low}" stroke="${col}" stroke-width="2"/>
	<circle cx="${x + 52}" cy="198" r="22" fill="${col}"/>
	<text x="${x + 52}" y="206" text-anchor="middle" font-size="24" font-weight="700" fill="${C.bg}" font-family="${FONT}">${letter}</text>
	<text x="${x + 90}" y="206" font-size="20" letter-spacing="3" fill="${col}" font-family="${FONT}">${letter} SIDE</text>
	<text x="${x + 32}" y="268" font-size="48" font-weight="700" fill="${C.text}" font-family="${FONT}">${esc(name)}</text>
	<text x="${x + 32}" y="304" font-size="22" fill="${C.muted}" font-family="${FONT}">${esc(tagline)}</text>
	<text x="${x + 32}" y="352" font-size="30" font-weight="700" fill="${col}" font-family="${FONT}">${esc(size.value)}<tspan dx="10" font-size="19" font-weight="400" fill="${C.muted}">${esc(size.label)}</tspan></text>
	${lines}`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
	<rect width="${W}" height="${H}" fill="${C.bg}"/>
	<rect x="0" y="0" width="${W / 2}" height="8" fill="${C.a}"/>
	<rect x="${W / 2}" y="0" width="${W / 2}" height="8" fill="${C.b}"/>
	<text x="64" y="88" font-size="44" font-weight="700" fill="${C.text}" font-family="${FONT}">Two languages, one alphabet</text>
	<text x="64" y="126" font-size="22" fill="${C.muted}" font-family="${FONT}">Learn them as real languages: verbs, nouns, idioms. ${segments.length} segments, a retro game at the end.</text>
	${side(64, 'a', 'A', 'Assembly', 'The first language of the machine', ['mov ax, [speed]', 'add ax, [boost]', 'mov [speed], ax'])}
	${side(616, 'b', 'B', 'Fortran', 'The language that speaks maths', ['speed = speed + boost'])}
	<text x="64" y="${H - 28}" font-size="20" fill="${C.text}" font-family="${FONT}">kairin.github.io/000-111-learn</text>
	<text x="${W - 64}" y="${H - 28}" text-anchor="end" font-size="18" fill="${C.muted}" font-family="${FONT}">Small dictionary, long sentences · Large dictionary, short sentences</text>
</svg>`;

const out = path.join(SITE_DIR, 'public/og-image.png');
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`og-image: wrote ${path.relative(SITE_DIR, out)} (${W}×${H})`);
