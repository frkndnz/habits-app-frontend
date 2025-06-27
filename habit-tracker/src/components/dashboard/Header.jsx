import React, { useCallback } from "react";
import NewHabitModal from "./NewHabitModal";
import { useState } from "react";

import { useAddHabitMutation } from "../../features/habits/habitApi";
const Header = () => {

    const [addHabit, { isLoading }] = useAddHabitMutation();

    const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);

    


    const handleAddHabit = (habit) => {

        addHabit(habit).unwrap();
        setIsAddHabitModalOpen(false);
    };


    return (
        <header className="flex justify-between items-center p-6 bg-slate-700 rounded-t-xl border-b border-teal-400">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">H</span>
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Welcome Back!</h1>
                    <p className="text-gray-400 text-sm">Build better habits, one day at a time</p>
                </div>
            </div>
            <button onClick={()=>setIsAddHabitModalOpen(true)} className="text-sm sm:text-lg   bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white  p-2 sm:p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                New Habit
            </button>
            <NewHabitModal open={isAddHabitModalOpen}  onClose={() => setIsAddHabitModalOpen(false)} onSave={handleAddHabit} />
        </header>
    )
};
export default Header;