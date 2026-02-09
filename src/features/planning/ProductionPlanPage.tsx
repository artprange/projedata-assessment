import PageWrapper from '../../components/PageWrapper';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import useProductionPlan from './useProductionPlan';
import { formatBRL } from '../../lib/formatters';
import type { ProductionPlanItem } from '../../models/produtionPlan';

export default function ProductionPlanPage() {
	const { data, remainingRows, error, isLoading, load } = useProductionPlan();

	return (
		<PageWrapper
			title="Production plan"
			subtitle="Suggested quantities based on current material stock (higher price first)."
			actions={
				<Button
					onClick={load}
					isLoading={isLoading}
				>
					Refresh
				</Button>
			}
		>
			{error ? (
				<Alert
					variant="error"
					title="Error"
				>
					{error}
				</Alert>
			) : null}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card className="p-4">
					<div className="text-sm text-gray-600">Grand total value</div>
					<div className="text-2xl font-semibold">
						{formatBRL(data?.grandTotalValue ?? 0)}
					</div>
				</Card>

				<Card className="p-4">
					<div className="text-sm text-gray-600">Planned items</div>
					<div className="text-2xl font-semibold">
						{data?.items?.length ?? 0}
					</div>
				</Card>
			</div>

			<Table<ProductionPlanItem>
				columns={[
					{
						key: 'product',
						header: 'Product',
						render: (r) => (
							<div>
								<div className="font-medium">{r.productName}</div>
								<div className="text-xs text-gray-500">{r.productCode}</div>
							</div>
						),
					},
					{
						key: 'unitPrice',
						header: 'Unit price',
						className: 'whitespace-nowrap',
						render: (r) => formatBRL(r.unitPrice),
					},
					{
						key: 'qty',
						header: 'Suggested qty',
						className: 'whitespace-nowrap',
						render: (r) => r.suggestedQuantity,
					},
					{
						key: 'total',
						header: 'Total',
						className: 'whitespace-nowrap',
						render: (r) => formatBRL(r.totalValue),
					},
				]}
				rows={data?.items ?? []}
				getRowKey={(r) => r.productId}
				emptyText={
					isLoading
						? 'Loading...'
						: 'No products can be produced with the current stock.'
				}
			/>

			<div className="mt-6">
				<h2 className="text-lg font-semibold">Remaining stock after plan</h2>
				<p className="text-sm text-gray-600">
					Materials left if you produce the suggested quantities.
				</p>
			</div>

			<Table<{
				materialId: string;
				materialCode: string;
				materialName: string;
				qty: number;
			}>
				columns={[
					{
						key: 'material',
						header: 'Material',
						render: (r) => (
							<div>
								<div className="font-medium">{r.materialName}</div>
								<div className="text-xs text-gray-500">{r.materialCode}</div>
							</div>
						),
					},
					{
						key: 'qty',
						header: 'Remaining qty',
						className: 'whitespace-nowrap',
						render: (r) => r.qty,
					},
				]}
				rows={remainingRows}
				getRowKey={(r) => r.materialId}
				emptyText={isLoading ? 'Loading...' : 'No remaining stock data.'}
			/>
		</PageWrapper>
	);
}
