import api from '../lib/api';
import type { Material } from '../models/material';

export type CreateMaterialPayload = Omit<Material, 'id'>;
export type UpdateMaterialPayload = Omit<Material, 'id'>;

export async function listMaterials() {
	const res = await api.get<Material[]>('/api/materials');
	return res.data;
}

export async function createMaterial(payload: CreateMaterialPayload) {
	const res = await api.post<Material>('/api/materials', payload);
	return res.data;
}

export async function updateMaterial(
	id: string,
	payload: UpdateMaterialPayload,
) {
	const res = await api.put<Material>(`/api/materials/${id}`, payload);
	return res.data;
}

export async function deleteMaterial(id: string) {
	await api.delete(`/api/materials/${id}`);
}
