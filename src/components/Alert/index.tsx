import type { AlertProps } from './types';

import { cn } from '../../lib/cs';
import { styles } from './styles';

function Alert({ variant = 'info', title, children, className }: AlertProps) {
	return (
		<div className={cn(styles.base, styles.variant[variant], className)}>
			{title ? <div className="font-semibold mb-1">{title}</div> : null}
			<div>{children}</div>
		</div>
	);
}
export default Alert;
