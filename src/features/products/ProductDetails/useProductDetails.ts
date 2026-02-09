import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Product } from '../../../models/product';
import type { Material } from '../../../models/material';
import type { ProductMaterial } from '../../../models/productMaterial';

import {
	addProductMaterial,
	deleteProductMaterial,
	getProduct,
	listProductMaterials,
	updateProduct,
	updateProductMaterial,
} from '../../../services/productService';
import { listMaterials } from '../../../services/materialService';
import getErrorMessage from '../../../lib/getErrorMessage';
import type { AddMaterialStateTypes, ProductFormStateTypes } from './types';

const initialProductForm: ProductFormStateTypes = {
	code: '',
	name: '',
	price: '0',
};
const initialAddForm: AddMaterialStateTypes = {
	materialId: '',
	requiredQuantity: '1',
};

export function useProductDetails(productId: string) {
	const [product, setProduct] = useState<Product | null>(null);
	const [bom, setBom] = useState<ProductMaterial[]>([]);
	const [materials, setMaterials] = useState<Material[]>([]);

	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [productForm, setProductForm] =
		useState<ProductFormStateTypes>(initialProductForm);

	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [addForm, setAddForm] = useState<AddMaterialStateTypes>(initialAddForm);

	const materialOptions = useMemo(
		() =>
			materials.map((m) => ({
				value: m.id,
				label: `${m.name} (${m.code})`,
			})),
		[materials],
	);

	const loadAll = useCallback(async () => {
		if (!productId) return;

		setIsLoading(true);
		setError('');
		try {
			const [p, pm, ms] = await Promise.all([
				getProduct(productId),
				listProductMaterials(productId),
				listMaterials(),
			]);

			setProduct(p);
			setBom(pm);
			setMaterials(ms);

			setProductForm({
				code: p.code,
				name: p.name,
				price: String(p.price),
			});
		} catch (e: unknown) {
			setError(getErrorMessage(e) || 'Failed to load product details');
		} finally {
			setIsLoading(false);
		}
	}, [productId]);

	useEffect(() => {
		void loadAll();
	}, [loadAll]);

	const saveProduct = useCallback(async () => {
		if (!product) return;

		setError('');
		const price = Number(productForm.price);

		if (
			!productForm.code.trim() ||
			!productForm.name.trim() ||
			Number.isNaN(price) ||
			price <= 0
		) {
			setError('Please fill code, name and a valid price (> 0).');
			return;
		}

		setIsLoading(true);
		try {
			const updated = await updateProduct(product.id, {
				code: productForm.code.trim(),
				name: productForm.name.trim(),
				price,
			});
			setProduct(updated);
		} catch (e: unknown) {
			setError(getErrorMessage(e) || 'Failed to update product');
		} finally {
			setIsLoading(false);
		}
	}, [product, productForm]);

	const openAddMaterial = useCallback(() => {
		setAddForm(initialAddForm);
		setIsAddModalOpen(true);
	}, []);

	const closeAddMaterial = useCallback(() => {
		setIsAddModalOpen(false);
	}, []);

	const refreshBom = useCallback(async () => {
		const refreshed = await listProductMaterials(productId);
		setBom(refreshed);
	}, [productId]);

	const addMaterialToProduct = useCallback(async () => {
		if (!product) return;

		setError('');
		const requiredQuantity = Number(addForm.requiredQuantity);

		if (
			!addForm.materialId ||
			Number.isNaN(requiredQuantity) ||
			requiredQuantity <= 0
		) {
			setError('Select a material and set a valid required quantity (> 0).');
			return;
		}

		setIsLoading(true);
		try {
			await addProductMaterial(product.id, {
				materialId: addForm.materialId,
				requiredQuantity,
			});

			closeAddMaterial();
			await refreshBom();
		} catch (e: unknown) {
			setError(getErrorMessage(e) || 'Failed to add material to product');
		} finally {
			setIsLoading(false);
		}
	}, [product, addForm, closeAddMaterial, refreshBom]);

	const changeRequiredQuantity = useCallback(
		async (item: ProductMaterial, value: string) => {
			const qty = Number(value);
			if (Number.isNaN(qty) || qty <= 0) return;

			setIsLoading(true);
			setError('');
			try {
				await updateProductMaterial(item.id, { requiredQuantity: qty });
				await refreshBom();
			} catch (e: unknown) {
				setError(getErrorMessage(e) || 'Failed to update required quantity');
			} finally {
				setIsLoading(false);
			}
		},
		[refreshBom],
	);

	const removeBomItem = useCallback(
		async (item: ProductMaterial) => {
			const ok = window.confirm('Remove this material from the product?');
			if (!ok) return;

			setIsLoading(true);
			setError('');
			try {
				await deleteProductMaterial(item.id);
				await refreshBom();
			} catch (e: unknown) {
				setError(
					getErrorMessage(e) || 'Failed to remove material from product',
				);
			} finally {
				setIsLoading(false);
			}
		},
		[refreshBom],
	);

	return {
		product,
		bom,
		materials,
		materialOptions,

		error,
		isLoading,

		productForm,
		setProductForm,

		isAddModalOpen,
		addForm,
		setAddForm,

		loadAll,
		saveProduct,
		openAddMaterial,
		closeAddMaterial,
		addMaterialToProduct,
		changeRequiredQuantity,
		removeBomItem,
	};
}
