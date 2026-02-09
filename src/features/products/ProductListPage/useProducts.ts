import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Product } from '../../../models/product';
import {
	createProduct,
	deleteProduct,
	listProducts,
	updateProduct,
} from '../../../services/productService';
import getErrorMessage from '../../../lib/getErrorMessage';

export type ProductFormState = {
	code: string;
	name: string;
	price: string;
};

const emptyForm: ProductFormState = { code: '', name: '', price: '0' };

function validateForm(
	form: ProductFormState,
): { ok: true; price: number } | { ok: false; message: string } {
	const price = Number(form.price);

	if (
		!form.code.trim() ||
		!form.name.trim() ||
		Number.isNaN(price) ||
		price <= 0
	) {
		return {
			ok: false,
			message: 'Please fill code, name and a valid price (> 0).',
		};
	}

	return { ok: true, price };
}

export function useProducts() {
	const [rows, setRows] = useState<Product[]>([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editing, setEditing] = useState<Product | null>(null);
	const [form, setForm] = useState<ProductFormState>(emptyForm);

	const modalTitle = useMemo(
		() => (editing ? 'Edit product' : 'New product'),
		[editing],
	);

	const load = useCallback(async () => {
		setIsLoading(true);
		setError('');
		try {
			const res = await listProducts();
			setRows(res);
		} catch (e: unknown) {
			setError(getErrorMessage(e) || 'Failed to load products');
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		void load();
	}, [load]);

	const openCreate = useCallback(() => {
		setEditing(null);
		setForm(emptyForm);
		setIsModalOpen(true);
	}, []);

	const openEdit = useCallback((p: Product) => {
		setEditing(p);
		setForm({ code: p.code, name: p.name, price: String(p.price) });
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
		setEditing(null);
	}, []);

	const onSave = useCallback(async () => {
		setError('');
		const validation = validateForm(form);

		if (!validation.ok) {
			setError(validation.message);
			return;
		}

		setIsLoading(true);
		try {
			if (editing) {
				await updateProduct(editing.id, {
					code: form.code.trim(),
					name: form.name.trim(),
					price: validation.price,
				});
			} else {
				await createProduct({
					code: form.code.trim(),
					name: form.name.trim(),
					price: validation.price,
				});
			}

			closeModal();
			await load();
		} catch (e: unknown) {
			setError(getErrorMessage(e) || 'Failed to save product');
		} finally {
			setIsLoading(false);
		}
	}, [form, editing, closeModal, load]);

	const onDelete = useCallback(
		async (p: Product) => {
			const ok = window.confirm(`Delete product "${p.name}"?`);
			if (!ok) return;

			setIsLoading(true);
			setError('');
			try {
				await deleteProduct(p.id);
				await load();
			} catch (e: unknown) {
				setError(getErrorMessage(e) || 'Failed to delete product');
			} finally {
				setIsLoading(false);
			}
		},
		[load],
	);

	return {
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
	};
}
