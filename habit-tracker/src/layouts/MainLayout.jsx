import React from "react";
import { Outlet,Link } from "react-router-dom";


const MainLayout = () => {
    return(
        <div>
            <nav className="bg-blue-600 text-white p-4 flex">
                <Link to="/" className="mr-4">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
            </nav>
            <main className="p-4">
                <Outlet />
            </main>
            <footer className="bg-gray-600 text-white p-4 text-center">
                <p>&copy; {new Date().getFullYear()} Furkan Deniz</p>
            </footer>
        </div>
    );
};

export default MainLayout;
// This is the main layout component that includes navigation and footer.