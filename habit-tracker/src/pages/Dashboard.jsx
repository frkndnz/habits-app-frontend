import React from "react";
import Header from "../components/dashboard/Header";
import HabitList from "../components/dashboard/HabitList";
const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-teal-600 p-4 md:p-8 rounded-lg ">
            <div className="max-w-6xl mx-auto">
                <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-lg border border-black/60">
                    <Header />
                    <HabitList />
                </div>
            </div>
        </div>

    )
}

export default Dashboard;