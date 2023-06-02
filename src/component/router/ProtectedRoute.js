import {Navigate} from "react-router-dom";
import {isAdmin, isLogin} from "../../utils/TokenUtils";
import TeacherNavbar from "../common/TeacherNavbar";

function ProtectedRoute({loginCheck, authCheck, adminCheck, children}) {

	if (authCheck) {
		const admin = isAdmin();
		return admin.length > 0 ? children : <TeacherNavbar/>
	}
	if (adminCheck) {
		const admin = isAdmin();
		return admin.length > 0 ? children : ''
	}
	if (loginCheck) {
		return isLogin() ? children : <Navigate to = "/login"/>
	} else {
		return !isLogin() ? children : <Navigate to = "/"/>
	}
}

export default ProtectedRoute;