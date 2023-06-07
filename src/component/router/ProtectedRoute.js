import {Navigate} from "react-router-dom";
import {isAdmin, isLeader, isLogin, isMember, isTeacher} from "../../utils/TokenUtils";
import TeacherNavbar from "../common/TeacherNavbar";

function ProtectedRoute({loginCheck, authCheck, adminCheck, teacherCheck, children}) {

	if (authCheck) {
		const member = isMember();
		return member.length > 0 ? children : ''
	}
	if (adminCheck) {
		const admin = isAdmin();
		const leader = isLeader();
		console.log(admin);
		return admin.length > 0 ? children : (leader.length > 0 ? children : <TeacherNavbar/>)
	}
	if (teacherCheck) {
		const teacher = isTeacher();
		return teacher.length > 0 ? children : ''
	}

	if (loginCheck) {
		return isLogin() ? children : <Navigate to = "/login"/>
	} else {
		return !isLogin() ? children : <Navigate to = "/"/>
	}
}

export default ProtectedRoute;