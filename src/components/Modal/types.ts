export type ModalProps = {
	isOpen: boolean;
	title?: string;
	onClose: () => void;
	children: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
};
