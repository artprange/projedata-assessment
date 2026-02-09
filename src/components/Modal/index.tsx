import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import Button from '../Button';
import type { ModalProps } from './types';
import { styles } from './styles';
import { cn } from '../../lib/cs';

function Modal({
	isOpen,
	title,
	onClose,
	children,
	footer,
	className,
}: ModalProps) {
	useEffect(() => {
		if (!isOpen) return;

		function onKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') onClose();
		}

		document.addEventListener('keydown', onKeyDown);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = '';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		<div
			className={styles.overlay}
			role="dialog"
			aria-modal="true"
			aria-label={title ?? 'Modal'}
		>
			<div
				className={styles.backdrop}
				onMouseDown={onClose}
			/>
			<div
				className={cn(styles.panel, className)}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<div className={styles.header}>
					<div className="min-w-0">
						{title ? (
							<h2 className="text-base font-semibold truncate">{title}</h2>
						) : null}
					</div>
					<Button
						variant="ghost"
						onClick={onClose}
						aria-label="Close modal"
					>
						✕
					</Button>
				</div>

				<div className={styles.body}>{children}</div>

				<div className={styles.footer}>
					{footer ?? (
						<Button
							variant="secondary"
							onClick={onClose}
						>
							Close
						</Button>
					)}
				</div>
			</div>
		</div>,
		document.body,
	);
}

export default Modal;
