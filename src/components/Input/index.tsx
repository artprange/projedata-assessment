import type { InputProps } from './types';

import { styles } from './styles';
import { cn } from '../../lib/cs';

function Input({ label, error, hint, className, id, ...props }: InputProps) {
	const inputId = id ?? props.name ?? undefined;
	const describedBy = error
		? `${inputId}-error`
		: hint
			? `${inputId}-hint`
			: undefined;

	return (
		<div className="space-y-1">
			{label ? (
				<label
					htmlFor={inputId}
					className={styles.label}
				>
					{label}
				</label>
			) : null}

			<input
				id={inputId}
				className={cn(
					styles.input.base,
					error ? styles.input.error : styles.input.normal,
					className,
				)}
				aria-invalid={error ? true : undefined}
				aria-describedby={describedBy}
				{...props}
			/>

			{hint && !error ? (
				<p
					id={`${inputId}-hint`}
					className={styles.hint}
				>
					{hint}
				</p>
			) : null}

			{error ? (
				<p
					id={`${inputId}-error`}
					className={styles.error}
				>
					{error}
				</p>
			) : null}
		</div>
	);
}

export default Input;
