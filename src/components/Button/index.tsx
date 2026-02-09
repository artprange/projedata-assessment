import Spinner from '../Spinner';
import type { ButtonProps } from './types';
import { styles } from './styles';
import { cn } from '../../lib/cs';

export default function Button({
	variant = 'primary',
	size = 'md',
	className = '',
	isLoading = false,
	disabled,
	children,
	...props
}: ButtonProps) {
	const isDisabled = Boolean(disabled || isLoading);

	return (
		<button
			className={cn(
				styles.base,
				styles.size[size],
				styles.variant[variant],
				className,
			)}
			disabled={isDisabled}
			aria-busy={isLoading || undefined}
			{...props}
		>
			{isLoading ? <Spinner size="sm" /> : null}
			{children}
		</button>
	);
}
