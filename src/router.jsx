/**
 * External dependencies
 */
import { Routes, Route, BrowserRouter } from 'react-router-dom';

/**
 * Internal dependencies
*/
import LayoutDefault from '@/layouts/default';

import Home from '@/pages/Home';
const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route element={<LayoutDefault />}>
				<Route path="/" element={<Home />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

export default Router;
