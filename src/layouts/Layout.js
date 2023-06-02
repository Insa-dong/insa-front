import {Outlet} from 'react-router-dom';
import Navbar from "../component/common/Navbar";
import ProtectedRoute from "../component/router/ProtectedRoute";

function Layout() {

	return (
		<>
			<div style = {{display: 'flex'}}>
				<ProtectedRoute authCheck = {true}><Navbar/></ProtectedRoute>
				<div>
					<Outlet/>
				</div>
			</div>
		</>
	);
}

export default Layout;
