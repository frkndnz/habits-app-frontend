import React from "react";
import {Pencil,Trash2,CheckCircle} from "lucide-react";

const HabitCard = ({ habit ,onEdit,onDelete}) => {
    
    return(
        <div className="p-4 bg-orange-500 rounded-2xl shadow-md border flex flex-col justify-between">
            <div>
            <h3 className="text-lg font-bold text-white">{habit.name.toUpperCase()}</h3>
                <p className="text-sm mt-1">Not completed yet</p>
            </div>
            <div className="flex justify-end items-center gap-3 mt-4">
                <button title="Edit" className="cursor-pointer" onClick={()=>onEdit(habit)} >
                    <Pencil size={18} className="opacity-80 hover:opacity-100"/>
                </button>
                <button title="Delete" className="cursor-pointer" onClick={()=>onDelete(habit.id)} >
                    <Trash2 size={18} className="opacity-80 hover:opacity-100"/>
                </button>
                <button title="Mark" className="cursor-pointer" >
                    <CheckCircle size={18} className="opacity-80 hover:opacity-100"/>
                </button>
            </div>
            
        </div>
    )
}

export default HabitCard;