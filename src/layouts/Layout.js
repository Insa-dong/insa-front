import {Outlet} from 'react-router-dom';
import Navbar from "../component/common/Navbar";

function Layout() {
	return (
		<>
			<div style = {{display: 'flex'}}>
				<Navbar/>
				<Outlet/>
			</div>
		</>
	);
}

export default Layout;