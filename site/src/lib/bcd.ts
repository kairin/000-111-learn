/*
 * Test 4 (the decimal counter): the same steps as game/src/bcd.inc, and the code that the pages of
 * test 4a and test 4b share: read the counter from the bit cells on the screen of the emulator.
 */

/** The packed decimal form of n (0 to 9999): one decimal digit in each nibble. The B side does the same with MOD and ISHFT. */
export const packed = (n: number) =>
	(Math.trunc(n / 1000) << 12) + ((Math.trunc(n / 100) % 10) << 8) + ((Math.trunc(n / 10) % 10) << 4) + (n % 10);

export const hex4 = (v: number) => v.toString(16).toUpperCase().padStart(4, '0');
export const hex2 = (v: number) => v.toString(16).toUpperCase().padStart(2, '0') + 'h';

/** ADD AL, b (or ADC AL, b with a carry in): the result and the flags CF and AF of the 8086. */
function add8(al: number, b: number, cin: number) {
	const sum = al + b + cin;
	return { al: sum & 0xff, cf: sum > 0xff ? 1 : 0, af: (al & 0x0f) + (b & 0x0f) + cin > 0x0f ? 1 : 0 };
}

/** DAA as the 8086 does it: correct AL after an addition of two packed decimal bytes. */
function daa(al: number, cf: number, af: number) {
	const old = al;
	if ((al & 0x0f) > 9 || af) al = (al + 6) & 0xff;
	if (old > 0x99 || cf) { al = (al + 0x60) & 0xff; cf = 1; } else cf = 0;
	return { al, cf };
}

/** The steps of bcd_inc for the counter value v, with DAA (right) or without it (wrong, test 4b). */
export function bcdInc(v: number, wrong = false) {
	const lo = v & 0xff, hi = v >> 8;
	const addLo = add8(lo, 1, 0);
	const daaLo = wrong ? { al: addLo.al, cf: addLo.cf } : daa(addLo.al, addLo.cf, addLo.af);
	const adcHi = add8(hi, 0, daaLo.cf);
	const daaHi = wrong ? { al: adcHi.al, cf: adcHi.cf } : daa(adcHi.al, adcHi.cf, adcHi.af);
	return { lo, hi, addLo, daaLo, adcHi, daaHi, next: (daaHi.al << 8) | daaLo.al, carry: daaHi.cf };
}

/** The number of steps that gives the counter value v. Right program: read the digits. Wrong program: it counts in binary. */
export function stepsOf(v: number, wrong = false) {
	if (wrong) return v;
	const d = [12, 8, 4, 0].map((s) => (v >> s) & 15);
	return d.some((x) => x > 9) ? null : d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3];
}

/** The four characters that bcd_digits writes: XLAT on the table "0123456789ABCDEF". */
export const digitsOf = (v: number) => hex4(v);

// The places of the cells on the screen (game/src/counter.asm): 16 bit cells under the 4 digits,
// and the carry cell on the left. We read the center pixel of each cell.
const CELL_Y = 116, DIGIT_X = 36, CELL = 12;
const bitCell = (bit: number) => {
	const k = 15 - bit; // bit 15 is the left cell
	return { x: DIGIT_X + Math.trunc(k / 4) * 64 + (k % 4) * (CELL + 2) + CELL / 2, y: CELL_Y + CELL / 2 };
};
const CARRY = { x: 14 + CELL / 2, y: CELL_Y + CELL / 2 };

/**
 * Read the screen of the emulator every 50 ms. A yellow cell is a 1, a gray cell is a 0, and a red carry cell
 * is a carry. Call onValue when the counter or the carry changes.
 */
export function followCounter(frame: HTMLIFrameElement, onValue: (v: number, carry: number) => void) {
	let last = -1, busy = false;
	async function tick() {
		const ci = (frame.contentWindow as any)?.ci;
		if (ci && !busy) {
			busy = true;
			try {
				const img: ImageData = await ci.screenshot();
				const px = (x: number, y: number) => {
					const p = (y * img.width + x) * 4;
					return [img.data[p], img.data[p + 1], img.data[p + 2]];
				};
				let v = 0, seen = true;
				for (let bit = 15; bit >= 0; bit--) {
					const { x, y } = bitCell(bit);
					const [r, g, b] = px(x, y);
					const yellow = r > 200 && g > 200 && b < 120;
					const gray = Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && r > 60 && r < 160;
					if (!yellow && !gray) seen = false; // the program has not drawn the cells yet
					if (yellow) v |= 1 << bit;
				}
				const [r, g] = px(CARRY.x, CARRY.y);
				const carry = r > 200 && g < 120 ? 1 : 0;
				const key = v * 2 + carry;
				if (seen && key !== last) { last = key; onValue(v, carry); }
			} catch { /* the emulator is not ready yet */ }
			busy = false;
		}
		setTimeout(tick, 50);
	}
	tick();
	return () => { last = -1; };
}
