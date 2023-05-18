import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import StudyInfo from "./pages/study/StudyInfo";
import StudyRegistration from "./pages/study/StudyRegistration";
import Training from "./pages/training/Training";
import TrainingDetail from "./pages/training/TrainingDetail";
import TrainingRegistration from "./pages/training/TrainingRegistration";
import BoardDetail from './pages/board/BoardDetail';
import AdminAbs from './pages/abs/AdminAbs';
import EmpRegistration from './pages/emp/EmpRegistration';
import EmpDetail from './pages/emp/EmpDetail';
import EmpPopup from './pages/emp/EmpPopup';


function App() {
	return (
		<div className="body">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<ProtectedRoute loginCheck={false}><Login /></ProtectedRoute>} />
					<Route path="/" element={<ProtectedRoute loginCheck={true}><Layout /></ProtectedRoute>}>
						<Route index element={<Main />} />
						<Route path="board" element={<Board />} />
						<Route path="board/:boardCode" element={<BoardDetail />} />
						<Route path="training"
							element={<ProtectedRoute authCheck={true}><Training /></ProtectedRoute>} />
						<Route path="search"
							element={<ProtectedRoute authCheck={true}><Training /></ProtectedRoute>} />
						<Route path="training/:trainingCode"
							element={<ProtectedRoute authCheck={true}><TrainingDetail /></ProtectedRoute>} />
						<Route path="training/registration"
							element={<ProtectedRoute authCheck={true}><TrainingRegistration /></ProtectedRoute>} />
						<Route path="abs" element={<Abs />} />
						<Route path="abs/adminAbs" element={<AdminAbs />} />
						<Route path="study" element={<Study />} />
						<Route path="studySearch" element={<Study />} />
						<Route path="study/registration" element={<StudyRegistration />} />
						<Route path="studyInfo/:studyInfoCode" element={<StudyInfo />} />
						<Route path="emp" element={<Emp />} />
						<Route path="emp/empregistration" element={<EmpRegistration/>}/>
						<Route path="emp/empdetail" element={<EmpDetail/>}/>
						<Route path="student" element={<Student />} />
						<Route path="student/:stuCode" element={<StudentDetail />}>

						</Route>
						<Route path="student/registration" element={<StudentRegistration />} />
						
					</Route>
					<Route path="idsearch" element={<IdSearch />} />
					<Route path="idsearchsuccess" element={<IdSearchSuccess />} />
					<Route path="pwsearch" element={<PwSearch />} />
					<Route path="pwsearchsuccess" element={<PwSearchSuccess />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;