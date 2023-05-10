import {Outlet} from 'react-router-dom';
import Navbar from "../component/common/Navbar";

function Layout() {

	return (
		<>
			<div style = {{display: 'flex'}}>
				<Navbar/>
				<div>
					<Outlet/>
				</div>
			</div>
		</>
	);
}

export default Layout;