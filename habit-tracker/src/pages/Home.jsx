import React from "react";
import LandingPage from "./LandingPage";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import { Navigate } from "react-router-dom";

const Home = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <LandingPage />;
    }
    else {
        return <Navigate to='/dashboard' replace/>
    }
}

export default Home;