export const styles = {
	shell: 'min-h-screen bg-gray-50',
	container: 'max-w-6xl mx-auto p-6 space-y-6',
	header: 'space-y-4',

	title: 'text-2xl font-semibold',
	subtitle: 'text-sm text-gray-600',

	nav: 'flex gap-2',

	navLink: {
		base: 'text-sm px-3 py-2 rounded-md border transition',
		active: 'bg-black text-white border-black',
		inactive: 'bg-white text-black border-gray-200 hover:bg-gray-50',
	},
} as const;
