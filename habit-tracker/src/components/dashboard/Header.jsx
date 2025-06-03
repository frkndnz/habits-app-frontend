import React, { useCallback } from "react";
import NewHabitModal from "./NewHabitModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../../features/habits/addHabit";

const Header = () => {

    const dispatch = useDispatch();

    const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);

    


    const handleAddHabit = (habit) => {

        dispatch(addHabit(habit));
        setIsAddHabitModalOpen(false);
    };


    return (
        <header className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-300 via-white-200 to-purple-300 rounded-t-xl border-b border-gray-100">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">H</span>
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Welcome Back!</h1>
                    <p className="text-gray-600 text-sm">Build better habits, one day at a time</p>
                </div>
            </div>
            <button onClick={()=>setIsAddHabitModalOpen(true)} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                New Habit
            </button>
            <NewHabitModal open={isAddHabitModalOpen}  onClose={() => setIsAddHabitModalOpen(false)} onSave={handleAddHabit} />
        </header>
    )
};
export default Header;