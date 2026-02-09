export type Column<T> = {
	key: string;
	header: string;
	render: (row: T) => React.ReactNode;
	className?: string;
};

export type TableProps<T> = {
	columns: Array<Column<T>>;
	rows: T[];
	getRowKey: (row: T) => string;
	emptyText?: string;
};
