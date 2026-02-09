import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Material } from '../../models/material';
import {
	createMaterial,
	deleteMaterial,
	listMaterials,
	updateMaterial,
} from '../../services/materialService';
import getErrorMessage from '../../lib/getErrorMessage';

export type MaterialFormState = {
	code: string;
	name: string;
	stockQuantity: string;
};

const emptyForm: MaterialFormState = { code: '', name: '', stockQuantity: '0' };

function validateForm(
	form: MaterialFormState,
): { ok: true; stockQuantity: number } | { ok: false; message: string } {
	const stockQuantity = Number(form.stockQuantity);

	if (
		!form.code.trim() ||
		!form.name.trim() ||
		Number.isNaN(stockQuantity) ||
		stockQuantity < 0
	) {
		return {
			ok: false,
			message:
				'Please fill code, name and a valid non-negative stock quantity.',
		};
	}

	return { ok: true, stockQuantity };
}

export function useMaterials() {
	const [rows, setRows] = useState<Material[]>([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editing, setEditing] = useState<Material | null>(null);
	const [form, setForm] = useState<MaterialFormState>(emptyForm);

	const modalTitle = useMemo(
		() => (editing ? 'Edit material' : 'New material'),
		[editing],
	);

	const load = useCallback(async () => {
		setIsLoading(true);
		setError('');
		try {
			const res = await listMaterials();
			setRows(res);
		} catch (e: unknown) {
			setError(getErrorMessage(e) || 'Failed to load materials');
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

	const openEdit = useCallback((m: Material) => {
		setEditing(m);
		setForm({
			code: m.code,
			name: m.name,
			stockQuantity: String(m.stockQuantity),
		});
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
				await updateMaterial(editing.id, {
					code: form.code.trim(),
					name: form.name.trim(),
					stockQuantity: validation.stockQuantity,
				});
			} else {
				await createMaterial({
					code: form.code.trim(),
					name: form.name.trim(),
					stockQuantity: validation.stockQuantity,
				});
			}

			closeModal();
			await load();
		} catch (e: unknown) {
			setError(getErrorMessage(e) || 'Failed to save material');
		} finally {
			setIsLoading(false);
		}
	}, [form, editing, closeModal, load]);

	const onDelete = useCallback(
		async (m: Material) => {
			const ok = window.confirm(`Delete material "${m.name}"?`);
			if (!ok) return;

			setIsLoading(true);
			setError('');
			try {
				await deleteMaterial(m.id);
				await load();
			} catch (e: unknown) {
				setError(getErrorMessage(e) || 'Failed to delete material');
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
		form,
		setForm,

		openCreate,
		openEdit,
		closeModal,
		onSave,
		onDelete,
	};
}
