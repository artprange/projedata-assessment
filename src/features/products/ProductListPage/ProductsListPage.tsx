import { Link } from 'react-router-dom';

import PageWrapper from '../../../components/PageWrapper';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';

import type { Product } from '../../../models/product';
import { formatBRL } from '../../../lib/formatters';
import { useProducts } from './useProducts';

export default function ProductListPage() {
	const {
		rows,
		error,
		isLoading,
		isModalOpen,
		modalTitle,
		editing,
		form,
		setForm,
		openCreate,
		openEdit,
		closeModal,
		onSave,
		onDelete,
	} = useProducts();

	return (
		<PageWrapper
			title="Products"
			subtitle="Manage products and their selling price."
			actions={<Button onClick={openCreate}>New product</Button>}
		>
			{error ? (
				<Alert
					variant="error"
					title="Error"
				>
					{error}
				</Alert>
			) : null}

			<Table<Product>
				columns={[
					{
						key: 'code',
						header: 'Code',
						render: (r) => r.code,
						className: 'whitespace-nowrap',
					},
					{
						key: 'name',
						header: 'Name',
						render: (r) => (
							<div className="space-y-0.5">
								<div className="font-medium">{r.name}</div>
							</div>
						),
					},
					{
						key: 'price',
						header: 'Price',
						className: 'whitespace-nowrap',
						render: (r) => formatBRL(r.price),
					},
					{
						key: 'actions',
						header: '',
						className: 'whitespace-nowrap text-right',
						render: (r) => (
							<div className="flex justify-end gap-2">
								<Button
									variant="secondary"
									onClick={() => openEdit(r)}
								>
									Edit
								</Button>
								<Button
									variant="danger"
									onClick={() => onDelete(r)}
								>
									Delete
								</Button>
							</div>
						),
					},
				]}
				rows={rows}
				getRowKey={(r) => r.id}
				emptyText={isLoading ? 'Loading...' : 'No products found.'}
			/>

			<Modal
				isOpen={isModalOpen}
				title={modalTitle}
				onClose={closeModal}
				footer={
					<div className="flex gap-2">
						<Button
							variant="secondary"
							onClick={closeModal}
						>
							Cancel
						</Button>
						<Button
							onClick={onSave}
							isLoading={isLoading}
						>
							Save
						</Button>
					</div>
				}
			>
				<div className="space-y-3">
					<Input
						label="Code"
						value={form.code}
						onChange={(e) => setForm((s) => ({ ...s, code: e.target.value }))}
					/>
					<Input
						label="Name"
						value={form.name}
						onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
					/>
					<Input
						label="Price"
						type="number"
						min={0}
						step="0.01"
						value={form.price}
						onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
					/>
				</div>

				{editing ? (
					<p className="mt-3 text-xs text-gray-500">
						Editing: <span className="font-medium">{editing.name}</span>
					</p>
				) : null}
			</Modal>
		</PageWrapper>
	);
}
