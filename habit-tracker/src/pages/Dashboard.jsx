import React from "react";
import Header from "../components/dashboard/Header";
import HabitList from "../components/dashboard/HabitList";
const Dashboard = () => {
    return(
        <div className="bg-gray-300 mb-4  rounded-lg shadow-md">
        <Header/>
        <HabitList/>
        </div>
        
    )
}

export default Dashboard;