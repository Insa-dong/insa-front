import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Main from "./component/common/Main";
import ProtectedRoute from './component/router/ProtectedRoute';
import Layout from "./layouts/Layout";
import Abs from "./pages/abs/Abs";
import Board from './pages/board/Board';
import Emp from "./pages/emp/Emp";
import Error from "./pages/error/Error"
import IdSearch from './pages/login/IdSearch';
import IdSearchSuccess from './pages/login/IdSearchSuccess';
import Login from './pages/login/Login';
import PwSearch from './pages/login/PwSearch';
import PwSearchSuccess from './pages/login/PwSearchSuccess';
import Student from './pages/student/Student';
import StudentDetail from './pages/student/StudentDetail';
import StudentRegistration from './pages/student/StudentRegistration';
import Study from "./pages/study/Study";
import StudyDetail from "./pages/study/StudyDetail";
import StudyRegistration from "./pages/study/StudyRegistration";
import Training from "./pages/training/Training";
import TrainingDetail from "./pages/training/TrainingDetail";
import TrainingRegistration from "./pages/training/TrainingRegistration";


function App() {
	return (
		<div className = "body">
			<BrowserRouter>
				<Routes>
					<Route path = "/login" element = {<ProtectedRoute loginCheck = {false}><Login/></ProtectedRoute>}/>
					<Route path = "/" element = {<ProtectedRoute loginCheck = {true}><Layout/></ProtectedRoute>}>
						<Route index element = {<Main/>}/>
						<Route path = "board" element = {<Board/>}/>
						<Route path = "training" element = {<Training/>}/>
						<Route path = "search" element = {<Training/>}/>
						<Route path = "training/:trainingCode" element = {<TrainingDetail/>}/>
						<Route path = "training/registration" element = {<TrainingRegistration/>}/>
						<Route path = "abs" element = {<Abs/>}/>
						<Route path = "study" element = {<Study/>}/>
						<Route path = "studySearch" element = {<Study/>}/>
						<Route path = "study/:studyCode" element = {< StudyDetail/>}/>
						<Route path = "study/registration" element = {<StudyRegistration/>}/>
						<Route path = "emp" element = {<Emp/>}/>
						<Route path = "student" element = {<Student/>}/>
						<Route path = "student/:stuCode" element = {<StudentDetail/>}>

						</Route>
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