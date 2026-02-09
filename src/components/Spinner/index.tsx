import type { SpinnerProps } from './types';
import { styles } from './styles';
import { cn } from '../../lib/cs';

export default function Spinner({ size = 'md', className }: SpinnerProps) {
	return (
		<span
			className={cn(styles.base, styles.size[size], className)}
			aria-label="Loading"
			role="status"
		/>
	);
}
