import type { SelectProps } from './types';

import { styles } from './styles';
import { cn } from '../../lib/cs';

export default function Select({
	label,
	error,
	hint,
	id,
	className,
	options,
	placeholder = 'Select an option',
	...props
}: SelectProps) {
	const selectId = id ?? props.name ?? undefined;
	const describedBy = error
		? `${selectId}-error`
		: hint
			? `${selectId}-hint`
			: undefined;

	return (
		<div className="space-y-1">
			{label ? (
				<label
					htmlFor={selectId}
					className={styles.label}
				>
					{label}
				</label>
			) : null}

			<select
				id={selectId}
				className={cn(
					styles.select.base,
					error ? styles.select.error : styles.select.normal,
					className,
				)}
				aria-invalid={error ? true : undefined}
				aria-describedby={describedBy}
				defaultValue={props.value ? undefined : ''}
				{...props}
			>
				<option
					value=""
					disabled
				>
					{placeholder}
				</option>

				{options.map((o) => (
					<option
						key={o.value}
						value={o.value}
					>
						{o.label}
					</option>
				))}
			</select>

			{hint && !error ? (
				<p
					id={`${selectId}-hint`}
					className={styles.hint}
				>
					{hint}
				</p>
			) : null}

			{error ? (
				<p
					id={`${selectId}-error`}
					className={styles.error}
				>
					{error}
				</p>
			) : null}
		</div>
	);
}
