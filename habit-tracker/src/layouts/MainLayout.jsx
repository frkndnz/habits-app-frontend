import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbars/Navbar";


const MainLayout = () => {


    return (
        <div>
            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-lg shadow-md">
                <Navbar />
            </nav>
            <main className="">
                <Outlet />
            </main>
            <footer className="bg-green-600 text-white p-4 rounded-lg shadow-md text-center">
                <p className="font-bold" >&copy; {new Date().getFullYear()} Furkan Deniz</p>
            </footer>
        </div>
    );
};

export default MainLayout;
// This is the main layout component that includes navigation and footer.