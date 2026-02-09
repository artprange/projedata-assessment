import type { AlertVariant } from './types';

export const styles = {
	base: 'rounded-md border p-3 text-sm',
	variant: {
		info: 'border-blue-200 bg-blue-50 text-blue-800',
		success: 'border-green-200 bg-green-50 text-green-800',
		warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
		error: 'border-red-200 bg-red-50 text-red-800',
	} satisfies Record<AlertVariant, string>,
} as const;
