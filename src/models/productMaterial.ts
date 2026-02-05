import type { Material } from './material';

type ProductMaterial = {
	id: string;
	productId: string;
	materialId: string;
	requiredQuantity: number;
	material?: Material;
};

export type { ProductMaterial };
