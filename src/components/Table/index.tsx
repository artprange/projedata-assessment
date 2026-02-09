import type { TableProps } from './types';

import { styles } from './styles';
import { cn } from '../../lib/cs';

export default function Table<T>({
	columns,
	rows,
	getRowKey,
	emptyText = 'No data',
}: TableProps<T>) {
	return (
		<div className={styles.wrapper}>
			<table className={styles.table}>
				<thead className={styles.thead}>
					<tr>
						{columns.map((c) => (
							<th
								key={c.key}
								className={cn(styles.th, c.className)}
							>
								{c.header}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{rows.map((row) => (
						<tr
							key={getRowKey(row)}
							className={styles.tr}
						>
							{columns.map((c) => (
								<td
									key={c.key}
									className={cn(styles.td, c.className)}
								>
									{c.render(row)}
								</td>
							))}
						</tr>
					))}

					{rows.length === 0 ? (
						<tr className={styles.tr}>
							<td
								className={styles.emptyTd}
								colSpan={columns.length}
							>
								{emptyText}
							</td>
						</tr>
					) : null}
				</tbody>
			</table>
		</div>
	);
}
