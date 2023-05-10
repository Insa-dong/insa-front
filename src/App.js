import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Main from "./component/common/Main";
import Layout from "./layouts/Layout";
import Class from "./pages/class/Class";
import Login from "./pages/Login";
import Training from "./pages/training/Training";


function App() {
	return (
		<div className = "body">
			<BrowserRouter>
				<Routes>
					<Route path = "/" element = {<Login/>}/>
					<Route path = "main" element = {<Layout/>}>
						<Route index element = {<Main/>}/>
						<Route path = "training" element = {<Training/>}/>
						<Route path = "class" element = {<Class/>}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
