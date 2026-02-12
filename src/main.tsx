import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';

const shouldMock =
	import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === 'true';

if (shouldMock) {
	import('./mocks/browser')
		.then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
		.catch((err) => console.error('[MSW] failed to start', err));
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
