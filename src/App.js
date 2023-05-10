import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from "./component/common/Main";
import Layout from "./layouts/Layout";
import Class from "./pages/class/Class";
import Login from "./pages/Login";
import Training from "./pages/training/Training";
import Emp from "./pages/emp/Emp";


function App() {
	return (
		<div className="body">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Layout />}>
						<Route path="main" element={<Main />} />
						<Route path="training" element={<Training />} />
						<Route path="class" element={<Class />} />
						<Route path="emp" element={<Emp />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
