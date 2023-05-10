import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Main from "./component/common/Main";
import LoginForm from "./component/form/LoginForm";
import Layout from "./layouts/Layout";


function App() {
	return (
		<div className = "body">
			<BrowserRouter>
				<Routes>
					<Route path = "/" element = {<LoginForm/>}/>
					<Route path = "main" element = {<Layout/>}>
						<Route index element = {<Main/>}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
