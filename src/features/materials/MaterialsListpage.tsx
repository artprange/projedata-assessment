import PageWrapper from '../../components/PageWrapper';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

import type { Material } from '../../models/material';
import { useMaterials } from './useMaterials';

export default function MaterialListPage() {
	const {
		rows,
		error,
		isLoading,
		isModalOpen,
		modalTitle,
		form,
		setForm,
		openCreate,
		openEdit,
		closeModal,
		onSave,
		onDelete,
	} = useMaterials();

	return (
		<PageWrapper
			title="Materials"
			subtitle="Manage raw materials and available stock quantity."
			actions={<Button onClick={openCreate}>New material</Button>}
		>
			{error ? (
				<Alert
					variant="error"
					title="Error"
				>
					{error}
				</Alert>
			) : null}

			<Table<Material>
				columns={[
					{
						key: 'code',
						header: 'Code',
						render: (r) => r.code,
						className: 'whitespace-nowrap',
					},
					{ key: 'name', header: 'Name', render: (r) => r.name },
					{
						key: 'stock',
						header: 'Stock qty',
						render: (r) => r.stockQuantity,
						className: 'whitespace-nowrap',
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
				emptyText={isLoading ? 'Loading...' : 'No materials found.'}
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
						label="Stock quantity"
						type="number"
						min={0}
						value={form.stockQuantity}
						onChange={(e) =>
							setForm((s) => ({ ...s, stockQuantity: e.target.value }))
						}
					/>
				</div>
			</Modal>
		</PageWrapper>
	);
}
