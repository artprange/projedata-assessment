export const styles = {
	overlay: 'fixed inset-0 z-50 flex items-center justify-center p-4',
	backdrop: 'absolute inset-0 bg-black/40',

	panel:
		'relative w-full max-w-lg rounded-lg border border-gray-200 bg-white shadow-lg',

	header:
		'flex items-center justify-between gap-3 border-b border-gray-100 p-4',
	body: 'p-4',
	footer: 'flex items-center justify-end gap-2 border-t border-gray-100 p-4',
} as const;
