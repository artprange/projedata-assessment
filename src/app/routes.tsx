import { createBrowserRouter } from 'react-router-dom';
import ProductionPlanPage from '../features/planning/ProductionPlanPage';
import MaterialListPage from '../features/materials/MaterialsListpage';
import ProductDetailsPage from '../features/products/ProductDetails/ProductDetailsPage';
import ProductListPage from '../features/products/ProductListPage/ProductsListPage';

const router = createBrowserRouter([
	{ path: '/', element: <ProductionPlanPage /> },
	{ path: '/products', element: <ProductListPage /> },
	{ path: '/products/id', element: <ProductDetailsPage /> },
	{ path: '/materials', element: <MaterialListPage /> },
]);

export default router;
