import {Navigate} from "react-router-dom";
import {isAdmin, isLogin} from "../../utils/TokenUtils";
import TeacherNavbar from "../common/TeacherNavbar";

function ProtectedRoute({loginCheck, authCheck, children}) {

	if (authCheck) {
		const admin = isAdmin();
		return admin.length > 0 ? children : <TeacherNavbar/>
	}
	if (loginCheck) {
		return isLogin() ? children : <Navigate to = "/login"/>
	} else {
		return !isLogin() ? children : <Navigate to = "/"/>
	}
}

export default ProtectedRoute;