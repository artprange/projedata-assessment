import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Material } from '../../models/material';

import { getProductionPlan } from '../../services/planningService';
import { listMaterials } from '../../services/materialService';
import type { ProductionPlanResponse } from '../../models/produtionPlan';
import getErrorMessage from '../../lib/getErrorMessage';

export type RemainingStockRow = {
	materialId: string;
	materialCode: string;
	materialName: string;
	qty: number;
};

function useProductionPlan() {
	const [data, setData] = useState<ProductionPlanResponse | null>(null);
	const [materials, setMaterials] = useState<Material[]>([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const load = useCallback(async () => {
		setIsLoading(true);
		setError('');
		try {
			const [plan, mats] = await Promise.all([
				getProductionPlan(),
				listMaterials(),
			]);
			setData(plan);
			setMaterials(mats);
		} catch (e: unknown) {
			setError(getErrorMessage(e) || 'Failed to load production plan');
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		void load();
	}, [load]);

	const remainingRows = useMemo(() => {
		const map = data?.remainingStock ?? {};
		const nameById = new Map(materials.map((m) => [m.id, m]));

		return Object.entries(map)
			.map(([materialId, qty]) => {
				const m = nameById.get(materialId);
				return {
					materialId,
					materialCode: m?.code ?? materialId,
					materialName: m?.name ?? 'Unknown material',
					qty,
				};
			})
			.sort((a, b) => a.materialName.localeCompare(b.materialName));
	}, [data, materials]);

	return { data, materials, remainingRows, error, isLoading, load };
}

export default useProductionPlan;
