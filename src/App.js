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
import ProtectedRoute from './component/router/ProtectedRoute';
import Board from './pages/board/Board';


function App() {
	return (
		<div className = "body">
			<BrowserRouter>
				<Routes>
					<Route path = "/login" element = {<ProtectedRoute loginCheck={false}><Login/></ProtectedRoute>}/>
					<Route path = "/" element = {<ProtectedRoute loginCheck={true}><Layout/></ProtectedRoute>}>
						<Route index element = {<Main/>}/>
						<Route path = "board" element = {<Board/>}/>
						<Route path = "training" element = {<Training/>}/>
						<Route path = "training/:trainingCode" element = {<TrainingDetail/>}/>
						<Route path = "training/registration" element = {<TrainingRegistration/>}/>
						<Route path = "abs" element = {<Abs/>}/>
						<Route path = "class" element = {<Class/>}/>
						<Route path = "emp" element = {<Emp/>}/>
					</Route>

					<Route path = "*" element = {<Error/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
