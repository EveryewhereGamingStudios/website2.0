import Nav from "../Components/Nav"
import Sidebar from "../Components/Sidebar"
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return <>
        <div className="sidebar">
            <Sidebar /> 
        </div>
        <div className="main">
            <Nav />
            <div className="container">
                <Outlet />
            </div>
        </div>
    </>
};

export default MainLayout;