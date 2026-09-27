/** Minimal inline Markdown (escape, **bold**, `code`, [text](url)) for short strings from review data. */
export function esc(s: unknown): string {
	return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

export function inline(s: unknown): string {
	return esc(s)
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s.,;:)]|$)/g, '$1<em>$2</em>')
		.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
}

export const SEVERITIES = ['critical', 'major', 'minor'] as const;
export const STATUSES = ['open', 'verify', 'confirmed', 'disputed', 'fixed', 'wont-fix'] as const;
export const RESOLVED = ['confirmed', 'disputed', 'fixed', 'wont-fix'];
