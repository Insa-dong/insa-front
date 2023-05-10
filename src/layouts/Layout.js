import { Outlet } from 'react-router-dom';
import Navbar from "../component/common/Navbar";
import Header from '../component/common/Header';

function Layout() {
	return (
		<>
			<div style={{ display: 'flex' }}>
				<Navbar />
				<div>
					<Header />
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default Layout;