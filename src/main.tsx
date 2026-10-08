import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';

if (import.meta.env.VITE_DEMO === 'true') {
	const { worker } = await import('./mocks/browser');
	await worker.start({
		onUnhandledRequest: 'bypass',
		serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
	});
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
