import axios from 'axios';

const api = axios.create({
	baseURL: '/api',
	headers: { 'Content-type': 'application/json' },
});

export default api;