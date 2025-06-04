import React from "react";
import LandingPage from "./LandingPage";
import { useSelector } from "react-redux";

const Home = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <LandingPage />;
    }
    else {
        return (
            <div className="flex flex-col items-center justify-center   bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-400 mb-4 bg-teal-900 bg-opacity-80 px-6 py-3 rounded-lg shadow-lg">
                    Welcome Back!
                </h1>
                <span className="text-teal-600"> Habit Tracker</span>
            </div>
        );
    }
}

export default Home;