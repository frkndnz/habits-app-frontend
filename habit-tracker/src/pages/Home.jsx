import React from "react";
import LandingPage from "./LandingPage";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
const Home = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <LandingPage />;
    }
    else {
        return <Dashboard/>;
    }
}

export default Home;