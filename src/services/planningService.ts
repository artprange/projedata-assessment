import api from '../lib/api';
import type { ProductionPlanResponse } from '../models/produtionPlan';

export async function getProductionPlan() {
	const res = await api.get<ProductionPlanResponse>('/api/production-plan');
	return res.data;
}
