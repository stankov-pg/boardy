/**
 * External dependencies
 */
import { Outlet } from 'react-router-dom';

const LayoutDefault = () => {
	return (
		<>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default LayoutDefault;
