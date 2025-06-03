import React from "react";
import Header from "../components/dashboard/Header";
import HabitList from "../components/dashboard/HabitList";
const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                    <Header />
                    <HabitList />
                </div>
            </div>
        </div>

    )
}

export default Dashboard;