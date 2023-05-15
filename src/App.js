import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Main from "./component/common/Main";
import Layout from "./layouts/Layout";
import Abs from "./pages/abs/Abs";
import Class from "./pages/class/Class";
import Emp from "./pages/emp/Emp";
import Error from "./pages/error/Error"
import Login from "./pages/Login";
import Training from "./pages/training/Training";
import TrainingDetail from "./pages/training/TrainingDetail";
import TrainingRegistration from "./pages/training/TrainingRegistration";
import Student from './pages/student/Student';
import StudentDetail from './pages/student/StudentDetail';
import StudentRegistration from './pages/student/StudentRegistration';




function App() {
	return (
		<div className = "body">
			<BrowserRouter>
				<Routes>
					<Route path = "/login" element = {<Login/>}/>
					<Route path = "/" element = {<Layout/>}>
						<Route path = "main" element = {<Main/>}/>
						<Route path = "training" element = {<Training/>}/>
						<Route path = "training/:trainingCode" element = {<TrainingDetail/>}/>
						<Route path = "training/registration" element = {<TrainingRegistration/>}/>
						<Route path = "abs" element = {<Abs/>}/>
						<Route path = "class" element = {<Class/>}/>
						<Route path = "emp" element = {<Emp/>}/>
						<Route path = "student" element = {<Student/>}/>
						<Route path="student/:stuCode" element={<StudentDetail />}>
              		
            			</Route>
						<Route path = "student/registration" element = {<StudentRegistration/>}/>
					</Route>

					<Route path = "*" element = {<Error/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
