import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet,Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";


const MainLayout = () => {

    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    return(
        <div>
            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-lg shadow-md">
                <div>
                <Link to="/" className="mr-4">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <p className="text-xl font-bold">Habits App</p>
                </div>
                <div>
                    {isAuthenticated && user ? (
                        <>
                        <span className="mr-4">Welcome, {user.user_name}</span>
                        <button onClick={() => dispatch(logout())} className="ml-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200 cursor-pointer">Logout</button>
                        </>
                    ) : (
                        <>
                            <span className="mr-4">Welcome, Guest</span>
                            <Link to="/auth/login" className="ml-auto bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200">Login</Link>
                        </>
                    )}
                </div>
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