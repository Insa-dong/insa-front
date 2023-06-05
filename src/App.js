import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Main from './component/common/Main';
import ProtectedRoute from './component/router/ProtectedRoute';
import Layout from "./layouts/Layout";
import Abs from "./pages/abs/Abs";
import AdminAbs from './pages/abs/AdminAbs';
import Board from './pages/board/Board';
import BoardDetail from './pages/board/BoardDetail';
import Calendar from "./pages/calendar/Calendar";
import Emp from "./pages/emp/Emp";
import EmpDetail from './pages/emp/EmpDetail';
import EmpRegistration from './pages/emp/EmpRegistration';
import EmpRest from './pages/emp/EmpRest';
import EmpTeacher from './pages/emp/EmpTeacher';
import EmpTeacherDetail from './pages/emp/EmpTeacherDetail';
import EmpTeacherDetailPlus from "./pages/emp/EmpTeacherDetailPlus";
import Error from "./pages/error/Error"
import IdSearch from './pages/login/IdSearch';
import IdSearchSuccess from './pages/login/IdSearchSuccess';
import Login from "./pages/login/Login";
import PwSearch from './pages/login/PwSearch';
import PwSearchSuccess from './pages/login/PwSearchSuccess';
import Mypage from './pages/mpg/Mypage';
import AdminOff from './pages/off/AdminOff';
import Off from './pages/off/Off';
import OffSign from './pages/off/OffSign';
import TeamOff from './pages/off/TeamOff';
import Student from './pages/student/Student';
import StudentDetail from './pages/student/StudentDetail';
import StudentRegistration from './pages/student/StudentRegistration';
import Study from "./pages/study/Study";
import StudyInfo from "./pages/study/StudyInfo";
import StudyRegistration from "./pages/study/StudyRegistration";
import Training from "./pages/training/Training";
import TrainingDetail from "./pages/training/TrainingDetail";


function App() {
	return (
		<div className = "body">
			<BrowserRouter>
				<Routes>
					<Route path = "/login" element = {<Login/>}/>
					<Route path = "/" element = {<ProtectedRoute loginCheck = {true}><Layout/></ProtectedRoute>}>
						<Route index element = {<Main/>}/>
						<Route path = "cal" element = {< Calendar/>}/>
						<Route path = "mypage" element = {<Mypage/>}/>
						<Route path = "board" element = {<Board/>}/>
						<Route path = "board/:noticeCode" element = {<BoardDetail/>}/>
						<Route path = "training"
						       element = {<ProtectedRoute authCheck = {true}><Training/></ProtectedRoute>}/>
						<Route path = "search"
						       element = {<ProtectedRoute authCheck = {true}><Training/></ProtectedRoute>}/>
						<Route path = "training/:trainingCode"
						       element = {<ProtectedRoute authCheck = {true}><TrainingDetail/></ProtectedRoute>}/>
						<Route path = "abs" element = {<Abs/>}/>
						<Route path = "abs/adminAbs" element = {<AdminAbs/>}/>
						<Route path = "study" element = {<ProtectedRoute authCheck = {true}><Study/></ProtectedRoute>}/>
						<Route path = "studySearch"
						       element = {<ProtectedRoute authCheck = {true}><Study/></ProtectedRoute>}/>
						<Route path = "study/registration"
						       element = {<ProtectedRoute authCheck = {true}><StudyRegistration/></ProtectedRoute>}/>
						<Route path = "studyInfo/:studyInfoCode"
						       element = {<ProtectedRoute authCheck = {true}><StudyInfo/></ProtectedRoute>}/>
						<Route path = "emp" element = {<Emp/>}/>
						<Route path = "emp/emprest" element = {<EmpRest/>}/>
						<Route path = "emp/empregistration" element = {<EmpRegistration/>}/>
						<Route path = "emp/empdetail/:empCode" element = {<EmpDetail/>}/>
						<Route path = "/empTeacher" element = {<EmpTeacher/>}/>
						<Route path = "/empTeacher/:studyCode" element = {<EmpTeacherDetail/>}/>
						<Route path = "/empTeacher/detail/:studyCode/:stuCode" element = {<EmpTeacherDetailPlus/>}/>
						<Route path = "student" element = {<Student/>}/>
						<Route path = "student/:stuCode" element = {<StudentDetail/>}/>
						<Route path = "off" element = {<Off/>}/>
						<Route path = "off/adminOff" element = {<AdminOff/>}/>
						<Route path = "off/teamOff" element = {<TeamOff/>}/>
						<Route path = "off/teamOff/offSign" element = {<OffSign/>}/>
						<Route path = "student/registration" element = {<StudentRegistration/>}/>
					</Route>
					<Route path = "idsearch" element = {<IdSearch/>}/>
					<Route path = "idsearchsuccess" element = {<IdSearchSuccess/>}/>
					<Route path = "pwsearch" element = {<PwSearch/>}/>
					<Route path = "pwsearchsuccess" element = {<PwSearchSuccess/>}/>
					<Route path = "*" element = {<Error/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;