import Navbar from "../common/Navbar";
import { Outlet, Route, Routes } from 'react-router-dom';
import Main from "../common/Main";

function Layout() {
    return (
        <>
             <div style={{ display: 'flex'}}>
                <Navbar />
                <Outlet/>
            </div>    
        </>
    );
}

export default Layout;