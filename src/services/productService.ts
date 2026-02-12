import api from '../lib/api';
import type { Product } from '../models/product';
import type { ProductMaterial } from '../models/productMaterial';

export type CreateProductPayload = Omit<Product, 'id'>;
export type UpdateProductPayload = Omit<Product, 'id'>;

export async function listProducts() {
	const res = await api.get<Product[]>('/products');
	return res.data;
}

export async function getProduct(id: string) {
	const res = await api.get<Product>(`/products/${id}`);
	return res.data;
}

export async function createProduct(payload: CreateProductPayload) {
	const res = await api.post<Product>('/products', payload);
	return res.data;
}

export async function updateProduct(id: string, payload: UpdateProductPayload) {
	const res = await api.put<Product>(`/products/${id}`, payload);
	return res.data;
}

export async function deleteProduct(id: string) {
	await api.delete(`/products/${id}`);
}

export async function listProductMaterials(productId: string) {
	const res = await api.get<ProductMaterial[]>(`/products/${productId}/materials`);
	return res.data;
}

export async function addProductMaterial(
	productId: string,
	payload: { materialId: string; requiredQuantity: number },
) {
	const res = await api.post<ProductMaterial>(
		`/products/${productId}/materials`,
		payload,
	);
	return res.data;
}

export async function updateProductMaterial(
	productMaterialId: string,
	payload: { requiredQuantity: number },
) {
	const res = await api.put<ProductMaterial>(
		`/product-materials/${productMaterialId}`,
		payload,
	);
	return res.data;
}

export async function deleteProductMaterial(productMaterialId: string) {
	await api.delete(`/product-materials/${productMaterialId}`);
}
