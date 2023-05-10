import Main from "./common/Main";
import Navbar from "./common/Navbar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from "./layouts/Layout";
import './App.css';
import Login from "./pages/Login";


function App() {
  return (
    <div className="body">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="main" element={<Layout/>}>
          <Route index element={<Main/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
