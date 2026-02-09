import { useParams } from 'react-router-dom';

import PageWrapper from '../../../components/PageWrapper';
import Card from '../../../components/Card';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';

import type { ProductMaterial } from '../../../models/productMaterial';
import { formatBRL } from '../../../lib/formatters';
import { useProductDetails } from './useProductDetails';

export default function ProductDetailsPage() {
	const { id } = useParams();
	const productId = id ?? '';

	const {
		product,
		bom,
		materialOptions,
		error,
		isLoading,
		productForm,
		setProductForm,
		isAddModalOpen,
		addForm,
		setAddForm,
		saveProduct,
		openAddMaterial,
		closeAddMaterial,
		addMaterialToProduct,
		changeRequiredQuantity,
		removeBomItem,
	} = useProductDetails(productId);

	return (
		<PageWrapper
			title="Product details"
			subtitle={product ? `Editing: ${product.name}` : 'Loading...'}
			actions={
				<Button
					onClick={saveProduct}
					isLoading={isLoading}
					disabled={!product}
				>
					Save product
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

			<Card className="p-4 space-y-3">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
					<Input
						label="Code"
						value={productForm.code}
						onChange={(e) =>
							setProductForm((s) => ({ ...s, code: e.target.value }))
						}
					/>
					<Input
						label="Name"
						value={productForm.name}
						onChange={(e) =>
							setProductForm((s) => ({ ...s, name: e.target.value }))
						}
					/>
					<Input
						label="Price"
						type="number"
						min={0}
						step="0.01"
						value={productForm.price}
						onChange={(e) =>
							setProductForm((s) => ({ ...s, price: e.target.value }))
						}
						hint={product ? `Current: ${formatBRL(product.price)}` : undefined}
					/>
				</div>
			</Card>

			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold">Materials for this product</h2>
					<p className="text-sm text-gray-600">
						Bill of materials (BOM): required quantities per unit.
					</p>
				</div>

				<Button
					onClick={openAddMaterial}
					disabled={!product}
				>
					Add material
				</Button>
			</div>

			<Table<ProductMaterial>
				columns={[
					{
						key: 'material',
						header: 'Material',
						render: (r) => (
							<div>
								<div className="font-medium">
									{r.material?.name ?? r.materialId}
								</div>
								<div className="text-xs text-gray-500">
									{r.material?.code ?? ''}
								</div>
							</div>
						),
					},
					{
						key: 'required',
						header: 'Required qty',
						className: 'whitespace-nowrap',
						render: (r) => (
							<Input
								type="number"
								min={0}
								step="0.01"
								defaultValue={String(r.requiredQuantity)}
								onBlur={(e) => changeRequiredQuantity(r, e.target.value)}
							/>
						),
					},
					{
						key: 'actions',
						header: '',
						className: 'whitespace-nowrap text-right',
						render: (r) => (
							<div className="flex justify-end">
								<Button
									variant="danger"
									onClick={() => removeBomItem(r)}
								>
									Remove
								</Button>
							</div>
						),
					},
				]}
				rows={bom}
				getRowKey={(r) => r.id}
				emptyText={
					isLoading
						? 'Loading...'
						: 'No materials associated to this product yet.'
				}
			/>

			<Modal
				isOpen={isAddModalOpen}
				title="Add material"
				onClose={closeAddMaterial}
				footer={
					<div className="flex gap-2">
						<Button
							variant="secondary"
							onClick={closeAddMaterial}
						>
							Cancel
						</Button>
						<Button
							onClick={addMaterialToProduct}
							isLoading={isLoading}
						>
							Add
						</Button>
					</div>
				}
			>
				<div className="space-y-3">
					<Select
						label="Material"
						options={materialOptions}
						value={addForm.materialId}
						onChange={(e) =>
							setAddForm((s) => ({ ...s, materialId: e.target.value }))
						}
						placeholder="Select a material"
					/>
					<Input
						label="Required quantity"
						type="number"
						min={0}
						step="0.01"
						value={addForm.requiredQuantity}
						onChange={(e) =>
							setAddForm((s) => ({ ...s, requiredQuantity: e.target.value }))
						}
					/>
				</div>
			</Modal>
		</PageWrapper>
	);
}
