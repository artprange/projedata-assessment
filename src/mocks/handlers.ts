import { http, HttpResponse } from 'msw';

type Product = { id: string; code: string; name: string; price: number };
type Material = {
	id: string;
	code: string;
	name: string;
	stockQuantity: number;
};
type ProductMaterial = {
	id: string;
	productId: string;
	materialId: string;
	requiredQuantity: number;
};

const db = {
	products: [] as Product[],
	materials: [] as Material[],
	productMaterials: [] as ProductMaterial[],
};

function uuid() {
	return crypto.randomUUID();
}

(function seed() {
	if (db.products.length || db.materials.length) return;

	const m1: Material = {
		id: uuid(),
		code: 'MAT-STEEL',
		name: 'Steel',
		stockQuantity: 100,
	};
	const m2: Material = {
		id: uuid(),
		code: 'MAT-PLASTIC',
		name: 'Plastic',
		stockQuantity: 200,
	};
	const m3: Material = {
		id: uuid(),
		code: 'MAT-PAINT',
		name: 'Paint',
		stockQuantity: 50,
	};
	db.materials.push(m1, m2, m3);

	const p1: Product = {
		id: uuid(),
		code: 'PRD-A',
		name: 'Product A',
		price: 120,
	};
	const p2: Product = {
		id: uuid(),
		code: 'PRD-B',
		name: 'Product B',
		price: 80,
	};
	db.products.push(p1, p2);

	db.productMaterials.push(
		{ id: uuid(), productId: p1.id, materialId: m1.id, requiredQuantity: 5 },
		{ id: uuid(), productId: p1.id, materialId: m3.id, requiredQuantity: 1 },
		{ id: uuid(), productId: p2.id, materialId: m2.id, requiredQuantity: 10 },
	);
})();

function buildProductionPlan() {
	const remaining: Record<string, number> = {};
	for (const m of db.materials) remaining[m.id] = m.stockQuantity;

	const productsSorted = [...db.products].sort((a, b) => b.price - a.price);

	const items = productsSorted
		.map((p) => {
			const bom = db.productMaterials.filter((pm) => pm.productId === p.id);
			if (bom.length === 0) {
				return {
					productId: p.id,
					productCode: p.code,
					productName: p.name,
					unitPrice: p.price,
					suggestedQuantity: 0,
					totalValue: 0,
				};
			}

			const maxQty = bom.reduce((acc, pm) => {
				const stock = remaining[pm.materialId] ?? 0;
				const possible = Math.floor(stock / pm.requiredQuantity);
				return Math.min(acc, possible);
			}, Number.POSITIVE_INFINITY);

			const suggestedQuantity = Number.isFinite(maxQty)
				? Math.max(0, maxQty)
				: 0;

			for (const pm of bom) {
				remaining[pm.materialId] =
					(remaining[pm.materialId] ?? 0) -
					suggestedQuantity * pm.requiredQuantity;
			}

			return {
				productId: p.id,
				productCode: p.code,
				productName: p.name,
				unitPrice: p.price,
				suggestedQuantity,
				totalValue: suggestedQuantity * p.price,
			};
		})
		.filter((i) => i.suggestedQuantity > 0);

	const grandTotalValue = items.reduce((sum, i) => sum + i.totalValue, 0);

	return { items, grandTotalValue, remainingStock: remaining };
}

export const handlers = [
	// MATERIALS
	http.get('/api/materials', () => HttpResponse.json(db.materials)),

	http.post('/api/materials', async ({ request }) => {
		const body = (await request.json()) as Omit<Material, 'id'>;
		const item: Material = { id: uuid(), ...body };
		db.materials.push(item);
		return HttpResponse.json(item, { status: 201 });
	}),

	http.put('/api/materials/:id', async ({ params, request }) => {
		const id = String(params.id);
		const body = (await request.json()) as Omit<Material, 'id'>;

		const idx = db.materials.findIndex((m) => m.id === id);
		if (idx < 0) return new HttpResponse(null, { status: 404 });

		db.materials[idx] = { id, ...body };
		return HttpResponse.json(db.materials[idx]);
	}),

	http.delete('/api/materials/:id', ({ params }) => {
		const id = String(params.id);
		db.materials = db.materials.filter((m) => m.id !== id);
		db.productMaterials = db.productMaterials.filter(
			(pm) => pm.materialId !== id,
		);
		return new HttpResponse(null, { status: 204 });
	}),

	// PRODUCTS
	http.get('/api/products', () => HttpResponse.json(db.products)),

	http.get('/api/products/:id', ({ params }) => {
		const id = String(params.id);
		const p = db.products.find((x) => x.id === id);
		if (!p) return new HttpResponse(null, { status: 404 });
		return HttpResponse.json(p);
	}),

	http.post('/api/products', async ({ request }) => {
		const body = (await request.json()) as Omit<Product, 'id'>;
		const item: Product = { id: uuid(), ...body };
		db.products.push(item);
		return HttpResponse.json(item, { status: 201 });
	}),

	http.put('/api/products/:id', async ({ params, request }) => {
		const id = String(params.id);
		const body = (await request.json()) as Omit<Product, 'id'>;

		const idx = db.products.findIndex((p) => p.id === id);
		if (idx < 0) return new HttpResponse(null, { status: 404 });

		db.products[idx] = { id, ...body };
		return HttpResponse.json(db.products[idx]);
	}),

	http.delete('/api/products/:id', ({ params }) => {
		const id = String(params.id);
		db.products = db.products.filter((p) => p.id !== id);
		db.productMaterials = db.productMaterials.filter(
			(pm) => pm.productId !== id,
		);
		return new HttpResponse(null, { status: 204 });
	}),

	// BOM (product materials)
	http.get('/api/products/:productId/materials', ({ params }) => {
		const productId = String(params.productId);

		const list = db.productMaterials
			.filter((pm) => pm.productId === productId)
			.map((pm) => ({
				...pm,
				material: db.materials.find((m) => m.id === pm.materialId) ?? null,
			}));

		return HttpResponse.json(list);
	}),

	http.post(
		'/api/products/:productId/materials',
		async ({ params, request }) => {
			const productId = String(params.productId);
			const body = (await request.json()) as {
				materialId: string;
				requiredQuantity: number;
			};

			db.productMaterials = db.productMaterials.filter(
				(pm) =>
					!(pm.productId === productId && pm.materialId === body.materialId),
			);

			const item: ProductMaterial = { id: uuid(), productId, ...body };
			db.productMaterials.push(item);

			return HttpResponse.json(item, { status: 201 });
		},
	),

	http.put('/api/product-materials/:id', async ({ params, request }) => {
		const id = String(params.id);
		const body = (await request.json()) as { requiredQuantity: number };

		const idx = db.productMaterials.findIndex((pm) => pm.id === id);
		if (idx < 0) return new HttpResponse(null, { status: 404 });

		db.productMaterials[idx] = {
			...db.productMaterials[idx],
			requiredQuantity: body.requiredQuantity,
		};
		return HttpResponse.json(db.productMaterials[idx]);
	}),

	http.delete('/api/product-materials/:id', ({ params }) => {
		const id = String(params.id);
		db.productMaterials = db.productMaterials.filter((pm) => pm.id !== id);
		return new HttpResponse(null, { status: 204 });
	}),

	http.get('/api/production-plan', () =>
		HttpResponse.json(buildProductionPlan()),
	),
];