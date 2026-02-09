import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5173',
	headers: { 'Content-type': 'application/json' },
});

export default api;
