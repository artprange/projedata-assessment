import api from '../lib/api';

export async function getProductionPlan() {
	const res = await api.get('/production-plan');
	return res.data;
}