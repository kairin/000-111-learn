/** Shared data helpers for the A side (Assembly) and B side (Fortran) pages. */
import segments from '../data/learn-segments.json';
import parts from '../data/parts-of-speech.json';
import vocabA from '../data/vocab-a.json';
import vocabB from '../data/vocab-b.json';

export type Side = 'a' | 'b';
export type Word = { word: string; pos: string; segment: string; meaning: string; example: string };

export const SIDES: Record<Side, { letter: string; name: string; label: string; tagline: string; vocab: typeof vocabA }> = {
	a: { letter: 'A', name: 'Assembly', label: 'A side', tagline: 'The first language of the machine', vocab: vocabA },
	b: { letter: 'B', name: 'Fortran', label: 'B side', tagline: 'The language that speaks maths', vocab: vocabB },
};
export const other = (side: Side): Side => (side === 'a' ? 'b' : 'a');
export const codeLang = (side: Side) => (side === 'a' ? 'nasm' : 'fortran-free-form');

export { segments, parts };

export function wordsOf(side: Side, segmentId?: string): Word[] {
	const words = SIDES[side].vocab.words as Word[];
	return segmentId ? words.filter((w) => w.segment === segmentId) : words;
}

/** Words grouped by part of speech, in the order of parts-of-speech.json. Empty groups are left out. */
export function byPart(words: Word[]) {
	return parts
		.map((p) => ({ part: p, words: words.filter((w) => w.pos === p.id) }))
		.filter((g) => g.words.length > 0);
}

export const segmentTitle = (id: string) => segments.find((s) => s.id === id)?.title ?? id;
