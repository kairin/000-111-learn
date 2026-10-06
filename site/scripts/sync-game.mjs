#!/usr/bin/env node
/**
 * Put the game on the site. Runs after sync-content.mjs, before `astro build`.
 *
 *   node_modules/js-dos/dist -> public/js-dos/   the PC emulator for the browser (GPL-2.0, with license and notice)
 *   ../game/build/site/      -> public/game/     the game bundle from game/build.sh (if it exists)
 *   ../game/{src,test,lab}   -> src/data/game.json   the words that each program uses, with the lens
 *
 * The output folders are git-ignored. On a computer without the game toolchain, the site still builds:
 * the game page then says that the game build is missing.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE } from '../site.config.mjs';

const SITE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(SITE_DIR, '..');
const GAME = path.join(REPO, 'game');
const VOCAB = path.join(REPO, 'learn/vocabulary');
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const readList = (p) => fs.readFileSync(p, 'utf8').split('\n').filter((l) => l && !l.startsWith('#'));

// ------------------------------------------------------------ js-dos (only the parts that the page needs)
const JSDOS_SRC = path.join(SITE_DIR, 'node_modules/js-dos/dist');
const JSDOS_OUT = path.join(SITE_DIR, 'public/js-dos');
fs.rmSync(JSDOS_OUT, { recursive: true, force: true });
const skip = (name) => /\.(map|symbols)$/.test(name) || name.startsWith('wdosbox-x') || name === 'types';
function copyDir(src, dst) {
	fs.mkdirSync(dst, { recursive: true });
	for (const e of fs.readdirSync(src, { withFileTypes: true })) {
		if (skip(e.name)) continue;
		const s = path.join(src, e.name), d = path.join(dst, e.name);
		e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
	}
}
copyDir(JSDOS_SRC, JSDOS_OUT);
const jsdosVersion = readJson(path.join(SITE_DIR, 'node_modules/js-dos/package.json')).version;
fs.copyFileSync(path.join(SITE_DIR, 'licenses/GPL-2.0.txt'), path.join(JSDOS_OUT, 'LICENSE.txt'));
fs.writeFileSync(
	path.join(JSDOS_OUT, 'NOTICE.txt'),
	`js-dos ${jsdosVersion} (https://js-dos.com) runs the DOS programs of this site.\n` +
		`License: GNU General Public License version 2 (see LICENSE.txt in this folder).\n` +
		`Source code: https://github.com/caiiiycuk/js-dos/tree/${jsdosVersion}\n` +
		`This site copies the unchanged files from the npm package js-dos@${jsdosVersion}.\n`,
);

// ------------------------------------------------------------ the game build
const BUILD = path.join(GAME, 'build/site');
const GAME_OUT = path.join(SITE_DIR, 'public/game');
fs.rmSync(GAME_OUT, { recursive: true, force: true });
let info = null;
if (fs.existsSync(path.join(BUILD, 'game.json'))) {
	fs.cpSync(BUILD, GAME_OUT, { recursive: true });
	info = readJson(path.join(BUILD, 'game.json'));
	// A fingerprint of the game files. The page adds it to their addresses (?v=...), so a browser
	// never plays an older copy that it keeps in its cache or in the js-dos local storage.
	const hash = crypto.createHash('sha256');
	for (const f of ['spike.jsdos', 'dot3d.jsdos', 'wrong3d.jsdos', 'spin3d.jsdos', 'wrongsp.jsdos', 'counter.jsdos', 'wrongct.jsdos', 'sine.bin', 'P3DW.BIN']) hash.update(fs.readFileSync(path.join(BUILD, f)));
	info.version = hash.digest('hex').slice(0, 12);
}

// A small page that holds only the player, one for each program. The game pages show it in an iframe,
// so the styles of js-dos cannot change the styles of the site.
const playerPage = (bundle) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>A-side program in a copy of a 1980s PC</title>
<link rel="stylesheet" href="${BASE}/js-dos/js-dos.css">
<style>html,body{margin:0;height:100%;background:#000}#dos{width:100%;height:100%}</style>
</head>
<body>
<div id="dos"></div>
<script src="${BASE}/js-dos/js-dos.js"></script>
<script>
Dos(document.getElementById("dos"), {
  url: "${BASE}/game/${bundle}?v=${info.version}",
  pathPrefix: "${BASE}/js-dos/emulators/",
  autoStart: true,
  kiosk: true,
  noCloud: true,
  theme: "dark",
  imageRendering: "pixelated",
  mouseCapture: false,
  // Keep the command interface of the emulator for tests (window.ci.screenshot() gives the screen pixels).
  onEvent: (event, ci) => { if (event === "ci-ready") window.ci = ci; }
});
</script>
</body>
</html>
`;
if (info) {
	fs.writeFileSync(path.join(GAME_OUT, 'player.html'), playerPage('spike.jsdos')); // test 1
	fs.writeFileSync(path.join(GAME_OUT, 'player-3d.html'), playerPage('dot3d.jsdos')); // test 2a
	fs.writeFileSync(path.join(GAME_OUT, 'player-3d-wrong.html'), playerPage('wrong3d.jsdos')); // test 2b: the wrong program
	fs.writeFileSync(path.join(GAME_OUT, 'player-spin.html'), playerPage('spin3d.jsdos')); // test 3a
	fs.writeFileSync(path.join(GAME_OUT, 'player-spin-wrong.html'), playerPage('wrongsp.jsdos')); // test 3b: the wrong program
	fs.writeFileSync(path.join(GAME_OUT, 'player-count.html'), playerPage('counter.jsdos')); // test 4a
	fs.writeFileSync(path.join(GAME_OUT, 'player-count-wrong.html'), playerPage('wrongct.jsdos')); // test 4b: the wrong program
}

// ------------------------------------------------------------ the words of each program (the lens)
const dictA = readJson(path.join(VOCAB, 'assembly.json')).words;
const dictB = readJson(path.join(VOCAB, 'fortran.json')).words;
const mnemonics = new Set(readList(path.join(VOCAB, 'reference/8086-mnemonics.txt')));
const directives = new Set(['ORG', 'BITS', 'CPU', 'DB', 'DW', 'DD', 'TIMES', 'INCBIN', '%INCLUDE', '%DEFINE', '%MACRO', 'SECTION', 'EQU', 'RESB', 'RESW']);
const registers = new Set(['AX', 'BX', 'CX', 'DX', 'SI', 'DI', 'BP', 'SP', 'CS', 'DS', 'ES', 'SS', 'AH', 'AL', 'BH', 'BL', 'CH', 'CL', 'DH', 'DL']);
const fortranKeywords = new Map(
	readList(path.join(VOCAB, 'reference/fortran2018-keywords.txt'))
		.map((l) => l.split(','))
		.filter(([, cat]) => cat !== 'specifier'), // argument names such as UNIT or DIM look like variable names
);
const hexNorm = (s) => s.toUpperCase().replace(/^0+(?=[0-9A-F])/, '');

function analyzeAsm(file) {
	const raw = fs.readFileSync(file, 'utf8');
	const code = raw.replace(/;.*$/gm, '');
	// A word must not start inside a number: in 3Ch, "Ch" is not the register CH.
	const tokens = new Set((code.match(/(?<![0-9A-Za-z_])[%A-Za-z_.][A-Za-z0-9_.]*/g) || []).map((t) => t.toUpperCase()));
	const hexes = new Set((code.match(/\b[0-9][0-9A-Fa-f]*h\b/g) || []).map(hexNorm));
	const has = (re) => re.test(code);
	const matched = dictA.filter((w) => {
		const m = w.word.match(/^INT (\w+), (AH|AX)=(\w+)$/);
		if (m) {
			const [, vec, reg, val] = m;
			const want = hexNorm(val);
			const regs = reg === 'AH' ? [`AH,\\s*0*${want}`, `AX,\\s*0*${want}00H`] : [`AX,\\s*0*${want}`];
			return has(new RegExp(`\\bINT\\s+0*${hexNorm(vec)}\\b`, 'i')) && regs.some((r) => new RegExp(`\\bMOV\\s+${r}\\b`, 'i').test(code));
		}
		if (w.word === '[ ]') return has(/\[/);
		if (w.word === 'label:') return has(/^\s*[A-Za-z_.]\w*:/m);
		if (w.word === ';') return /;/.test(raw);
		if (w.word === ',') return has(/,/);
		if (w.word === 'h') return hexes.size > 0;
		return w.word.split(' / ').some((alt) =>
			/^[0-9A-F]+h$/i.test(alt) ? hexes.has(hexNorm(alt)) : tokens.has(alt.toUpperCase()),
		);
	});
	const known = new Set(matched.flatMap((w) => w.word.toUpperCase().split(/[^%A-Z0-9]+/)));
	const fresh = [...tokens].filter((t) => (mnemonics.has(t) || directives.has(t) || registers.has(t)) && !known.has(t)).sort();
	return { matched: matched.map((w) => ({ word: w.word, pos: w.pos, segment: w.segment })), fresh, lines: raw.split('\n').length };
}

function analyzeFortran(file) {
	const raw = fs.readFileSync(file, 'utf8');
	const code = raw.replace(/'[^'\n]*'|"[^"\n]*"/g, (s) => (/^'\(/.test(s) ? "'(FMT)'" : '""')).replace(/!.*$/gm, '');
	const tokens = new Set((code.match(/[A-Za-z_][A-Za-z0-9_]*/g) || []).map((t) => t.toUpperCase()));
	const has = (re) => re.test(code);
	const special = {
		'::': /::/, '=': /[^=<>/]=[^=]/, '+ -': /[+-]/, '* /': /[^*]\*[^*]|[^/(]\/[^/=)]/, '**': /\*\*/, '( )': /\(/,
		'!': /!/, '&': /&\s*$/m, 'x(:)': /\(\s*:\s*\)/, 'x(2:5)': /\(\s*\w+\s*:\s*\w+\s*\)/, '*': /\b(print|read)\s*\*/i,
		"'(F8.2)'": /'\(FMT\)'/, '== /= < > <= >=': /==|\/=|<=|>=|[^<]<[^=]|[^>=-]>[^=]/, '.and. .or. .not.': /\.(and|or|not)\./i,
		'REAL( )': /[=+\-*/(,]\s*real\s*\(/i, 'INT( )': /[=+\-*/(,]\s*int\s*\(/i,
	};
	const matched = dictB.filter((w) => {
		if (w.word in special) return w.word === '!' ? /!/.test(raw) : w.word === '&' ? /&\s*$/m.test(raw) : has(special[w.word]);
		if (/^INTENT\((IN|OUT)\)$/.test(w.word)) return has(new RegExp(`intent\\s*\\(\\s*${w.word.slice(7, -1)}\\s*\\)`, 'i'));
		if (w.word === 'BIND(C)') return has(/bind\s*\(\s*c\s*\)/i);
		return w.word.split(' / ').some((alt) => {
			// "IF ... THEN ... END IF": the first word is enough (a one-line IF has no THEN).
			const words = (alt.includes('...') ? [alt.split(/\s+/)[0]] : alt.split(/\s+/)).filter((t) => /^[A-Z_][A-Z0-9_]*$/.test(t));
			return words.length > 0 && words.every((t) => tokens.has(t));
		});
	});
	const known = new Set(matched.flatMap((w) => w.word.toUpperCase().split(/[^A-Z0-9_]+/)));
	const fresh = [...tokens].filter((t) => fortranKeywords.has(t) && !known.has(t)).sort();
	return { matched: matched.map((w) => ({ word: w.word, pos: w.pos, segment: w.segment })), fresh, lines: raw.split('\n').length };
}

// The number is the test: 1 is the dot on a flat plane, 2 is the dot in 3D (tests 2a and 2b),
// 3 is the turning wave (tests 3a and 3b), 4 is the decimal counter (tests 4a and 4b).
const programs = [
	[1, 'src/spike.asm', 'a', 'The game (test 1): draws the curve and moves the dot'],
	[1, 'src/sine_y.inc', 'a', 'The shared routine: one angle in, one screen row out'],
	[1, 'test/check.asm', 'a', 'The test: runs sine_y for 256 angles and writes the rows to a file'],
	[1, 'lab/sine_table.f90', 'b', 'The laboratory: makes the sine table'],
	[1, 'lab/check_y.f90', 'b', 'The checker: compares the A-side rows with its own answers'],
	[2, 'src/dot3d.asm', 'a', 'The game (test 2a): draws the floor and the path, and moves the dot in 3D'],
	[2, 'src/path3d.inc', 'a', 'The shared routines: one angle in, one 3D point out, then one screen position'],
	[2, 'test/check3d.asm', 'a', 'The test: runs the routines for 256 angles and writes the positions to a file'],
	[2, 'lab/sine_table.f90', 'b', 'The laboratory: makes the sine table (the same table as test 1)'],
	[2, 'lab/check_3d.f90', 'b', 'The checker: compares the A-side positions with its own answers'],
	[3, 'src/spin3d.asm', 'a', 'The game (test 3a): draws the floor and the ring, and turns the wave with the dot on it'],
	[3, 'src/spin3d.inc', 'a', 'The shared routine: one angle along the wave and one turn in, one 3D point out'],
	[3, 'src/common.inc', 'a', 'The shared routines of tests 2 and 3: the keys, the pixels and the screen refresh'],
	[3, 'test/check3r.asm', 'a', 'The test: runs the routines for 16 turns and 256 angles, and writes the positions to a file'],
	[3, 'lab/check_spin.f90', 'b', 'The checker: compares the A-side positions with its own answers'],
	[4, 'src/counter.asm', 'a', 'The game (test 4a): shows the counter as four large digits and its 16 bits'],
	[4, 'src/bcd.inc', 'a', 'The shared routines: add 1 with ADD, ADC and DAA, and change the nibbles into digits'],
	[4, 'test/checkbcd.asm', 'a', 'The test: runs bcd_inc 10,000 times and writes each value to a file'],
	[4, 'lab/check_bcd.f90', 'b', 'The checker: makes each value again with MOD and ISHFT, and compares all 10,000'],
].map(([test, rel, side, role]) => ({
	test,
	file: rel,
	side,
	role,
	url: `https://github.com/kairin/000-111-learn/blob/main/game/${rel}`,
	...(side === 'a' ? analyzeAsm : analyzeFortran)(path.join(GAME, rel)),
}));

fs.mkdirSync(path.join(SITE_DIR, 'src/data'), { recursive: true });
fs.writeFileSync(path.join(SITE_DIR, 'src/data/game.json'), JSON.stringify({ built: Boolean(info), info, jsdosVersion, programs }, null, 1));
console.log(
	`sync-game: js-dos ${jsdosVersion}, game build ${info ? 'found' : 'MISSING (run game/dev.sh)'}; ` +
		programs.map((p) => `${p.file} ${p.matched.length} known / ${p.fresh.length} new`).join(', '),
);
