export const styles = {
	label: 'block text-sm font-medium text-gray-800',
	hint: 'text-xs text-gray-500',
	error: 'text-xs text-red-700',

	input: {
		base: 'w-full rounded-md border px-3 py-2 text-sm outline-none transition',
		normal:
			'border-gray-200 focus:border-black focus:ring-2 focus:ring-black/20',
		error:
			'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200',
	},
} as const;
