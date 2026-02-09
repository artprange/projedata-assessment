import type { SelectHTMLAttributes } from 'react';

export type SelectOption = { value: string; label: string };

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	label?: string;
	error?: string;
	hint?: string;
	options: SelectOption[];
	placeholder?: string;
};
