import axios from 'axios';

const api = axios.create({
	baseURL:
		import.meta.env.VITE_DEMO === 'true'
			? '/api'
			: `${(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/+$/, '')}/api`,
	headers: { 'Content-type': 'application/json' },
});

export default api;
