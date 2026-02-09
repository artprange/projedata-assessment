export const styles = {
	base: 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition border focus:outline-none focus:ring-2 focus:ring-black/30 disabled:opacity-60 disabled:cursor-not-allowed',

	size: {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-3 py-2 text-sm',
		lg: 'px-4 py-2.5 text-sm',
	},

	variant: {
		primary: 'bg-black text-white border-black hover:opacity-90',
		secondary: 'bg-white text-black border-gray-200 hover:bg-gray-50',
		danger: 'bg-white text-red-700 border-red-200 hover:bg-red-50',
		ghost: 'bg-transparent text-black border-transparent hover:bg-gray-100',
	},
} as const;
