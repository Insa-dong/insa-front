import {Navigate} from "react-router-dom";
import {isAdmin, isLogin} from "../../utils/TokenUtils";

function ProtectedRoute({loginCheck, authCheck, children}) {

	if (authCheck) {
		return isAdmin() ? children : <Navigate to = "/"/>
	}

	if (loginCheck) {
		return isLogin() ? children : <Navigate to = "/login"/>
	} else {
		return !isLogin() ? children : <Navigate to = "/"/>
	}
}

export default ProtectedRoute;