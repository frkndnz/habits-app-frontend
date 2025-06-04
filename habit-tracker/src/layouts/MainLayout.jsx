import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbars/Navbar";
import { Footer } from "../components/footerSection/Footer";

const MainLayout = () => {


    return (
        <div className="min-h-screen flex flex-col gap-4 px-2 sm:px-4 bg-gray-900">
            <nav className="bg-gradient-to-r from-gray-900 to-teal-600 text-white  px-4 py-3 flex justify-between items-center rounded-lg shadow-md  mt-4">
                <Navbar />
            </nav>
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
// This is the main layout component that includes navigation and footer.