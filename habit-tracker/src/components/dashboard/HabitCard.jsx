import React from "react";
import {Pencil,Trash2,CheckCircle} from "lucide-react";

import { selectHabitById } from "../../features/habits/habitSlice";
import { useSelector } from "react-redux";
const HabitCard = ({ habitId ,onEdit,onDelete,onMarkComplete}) => {

    const habit=useSelector((state) => selectHabitById(state, habitId));
    console.log(`Render oldu: ${habitId}`);
    return(
        <div className="p-4 bg-orange-500 rounded-2xl shadow-md border flex flex-col justify-between">
            <div>
            <h3 className="text-lg font-bold text-white">{habit.name.toUpperCase()}</h3>
                <p className="text-sm mt-1">
                    {habit.isCompletedToday ? "✔ Tamamlandı" : "⏳ Henüz tamamlanmadı!"}
                    </p>
            </div>
            <div className="flex justify-end items-center gap-3 mt-4">
                <button title="Edit" className="cursor-pointer" onClick={()=>onEdit(habit)} >
                    <Pencil size={18} className="opacity-80 hover:opacity-100"/>
                </button>
                <button title="Delete" className="cursor-pointer" onClick={()=>onDelete(habit.id)} >
                    <Trash2 size={18} className="opacity-80 hover:opacity-100"/>
                </button>
                <button title="Mark" className="cursor-pointer" onClick={()=>onMarkComplete(habit.id)} >
                    <CheckCircle size={18}  className={`hover:opacity-100 ${
              habit.isCompletedToday
                ? "text-white opacity-100"
                : "text-white opacity-80"
            }`}/>
                </button>
            </div>
            
        </div>
    )
}

export default HabitCard;