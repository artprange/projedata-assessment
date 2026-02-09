import type { CardProps } from './types';
import { styles } from './styles';
import { cn } from '../../lib/cs';

function Card({ className, ...props }: CardProps) {
	return (
		<div
			className={cn(styles.base, className)}
			{...props}
		/>
	);
}

export default Card;
