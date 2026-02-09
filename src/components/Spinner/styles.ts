import type { SpinnerSize } from './types';

export const styles = {
	base: 'inline-block animate-spin rounded-full border-2 border-black/20 border-t-black',
	size: {
		sm: 'h-4 w-4',
		md: 'h-5 w-5',
		lg: 'h-6 w-6',
	} satisfies Record<SpinnerSize, string>,
} as const;
