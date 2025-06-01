import React from "react";
import NewHabitModal from "./NewHabitModal";
import { useState } from "react";



const Header = () => {
    return(
        <header className="flex justify-between items-center  p-5  mt-4  "> 
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Welcome Back!</h1>
            
            <NewHabitModal />
        </header>
    )
};
export default Header;