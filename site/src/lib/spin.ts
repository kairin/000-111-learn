/*
 * Test 3 (the turning wave): the same whole-number steps as game/src/spin3d.inc and the routine
 * project of game/src/path3d.inc, and the code that the pages of test 3a and test 3b share:
 * follow the yellow dot on the screen of the emulator, and press the keys of the program.
 */
export const EYE_DISTANCE = 448, SCREEN_DISTANCE = 200, EYE_HEIGHT = 120, HORIZON_ROW = 50, FLOOR = -96;

export function project(x: number, y: number, z: number) {
	const distance = z + EYE_DISTANCE; // add cx, 448
	const sx = 160 + Math.trunc((x * SCREEN_DISTANCE) / distance); // imul, idiv (rounds toward zero), add 160
	const sy = HORIZON_ROW - Math.trunc(((y - EYE_HEIGHT) * SCREEN_DISTANCE) / distance); // sub, imul, idiv, neg, add
	return { distance, sx, sy };
}

/** spin_point for the angle i along the wave and the turn t. quarter is 64 (right) or 90 (test 3b). */
export function spinPoint(table: DataView, i: number, t: number, quarter = 64) {
	const sine = table.getInt16(i * 2, true);
	const d = 128 - i;
	const turnSine = table.getInt16(t * 2, true);
	const ci = (t + quarter) & 255;
	const turnCosine = table.getInt16(ci * 2, true);
	const y = (sine * 64) >> 8; // imul, then keep the middle two bytes of DX:AX
	const x = (d * turnSine) >> 8;
	const z = (d * turnCosine) >> 8;
	const dot = project(x, y, z);
	const shadow = project(x, FLOOR, z);
	const size = z >= 43 ? 2 : z >= -43 ? 3 : 4;
	return { i, t, ci, d, sine, turnSine, turnCosine, x, y, z, ...dot, shadowY: shadow.sy, size, di: (dot.sy * 320 + dot.sx) & 0xffff };
}
export type SpinPoint = ReturnType<typeof spinPoint>;

/** The program goes through 512 steps: step s draws the dot at angle s mod 256 on the wave with the turn s / 2. */
export const stepAngle = (s: number) => s & 255;
export const stepTurn = (s: number) => (s >> 1) & 255;

/**
 * Read the screen of the emulator every 30 ms, find the top-left pixel of the yellow square, and give the
 * step whose dot is at that pixel. Two steps can put the dot on the same pixel: then take the step that
 * comes next after the last one.
 */
export function followDot(frame: HTMLIFrameElement, addressOf: (s: number) => number | null, onStep: (s: number) => void) {
	let last = -1, lastPos = -1, busy = false;
	async function tick() {
		const ci = (frame.contentWindow as any)?.ci;
		if (ci && !busy) {
			busy = true;
			try {
				const img: ImageData = await ci.screenshot();
				const d = img.data;
				for (let p = 0; p < d.length; p += 4) {
					if (d[p] > 200 && d[p + 1] > 200 && d[p + 2] < 120) {
						const pos = p / 4;
						if (pos === lastPos) break;
						const want = (last + 1) & 511;
						let best = -1, bestDist = 1e9;
						for (let s = 0; s < 512; s++) {
							if (addressOf(s) !== pos) continue;
							const dist = (s - want) & 511;
							if (dist < bestDist) { best = s; bestDist = dist; }
						}
						if (best >= 0) { lastPos = pos; last = best; onStep(best); }
						break;
					}
				}
			} catch { /* the emulator is not ready yet */ }
			busy = false;
		}
		setTimeout(tick, 30);
	}
	tick();
	return () => { last = -1; lastPos = -1; };
}

/** The buttons under the screen press the keys of the program (1 to 5, Space, N), and Restart loads it again. */
export function wireControls(frame: HTMLIFrameElement, onRestart: () => void) {
	document.querySelectorAll<HTMLButtonElement>('.duet-controls button[data-key]').forEach((btn) =>
		btn.addEventListener('click', () => {
			const ci = (frame.contentWindow as any)?.ci;
			if (!ci) return;
			const key = Number(btn.dataset.key);
			ci.simulateKeyPress(key);
			if (key >= 49 && key <= 53) {
				document.querySelectorAll('.duet-controls button[data-key]').forEach((b) => {
					const k = Number((b as HTMLElement).dataset.key);
					if (k >= 49 && k <= 53) b.setAttribute('aria-pressed', String(b === btn));
				});
			}
			if (key === 32) {
				const pause = document.getElementById('btn-pause')!;
				const on = pause.getAttribute('aria-pressed') === 'true';
				pause.setAttribute('aria-pressed', String(!on));
				pause.textContent = on ? 'Pause' : 'Continue';
			}
		}),
	);
	document.getElementById('btn-restart')?.addEventListener('click', () => {
		onRestart();
		frame.src = frame.src;
	});
}

export function row(code: string, result: string, note = '', cls = '') {
	return `<li class="${cls}"><code>${code}</code><span class="val">${result}</span>${note ? `<span class="note">${note}</span>` : ''}</li>`;
}
