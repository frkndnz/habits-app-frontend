import React, { useState, useCallback } from "react";
import HabitCard from "./HabitCard";
import NewHabitModal from "./NewHabitModal";
import { useGetHabitsQuery } from "../../features/habits/habitApi";
import { useDeleteHabitMutation } from "../../features/habits/habitApi";
import { useUpdateHabitMutation } from "../../features/habits/habitApi";
import { useAddHabitLogMutation } from "../../features/habitLogs/habitLogApi";
import { useDeleteHabitLogMutation } from "../../features/habitLogs/habitLogApi";
const HabitList = () => {
    
    
   

    const {data }=useGetHabitsQuery();
    const [deleteHabit] = useDeleteHabitMutation();
    const [updateHabit] = useUpdateHabitMutation();
    const [addHabitLog] = useAddHabitLogMutation();
    const [deleteHabitLog] = useDeleteHabitLogMutation();
    console.log("data", data);

    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const handleEditClick = (habit) => {
        setSelectedHabit(habit);
        setIsEditModalOpen(true);
    };

    const handleEditSave = (updatedHabit) => {
        console.log("handleEditSave", updatedHabit);
        updateHabit(updatedHabit).unwrap();
        setIsEditModalOpen(false);
    }
    const handleDeleteClick = useCallback((habitId) => {
        if (window.confirm("Bu alışkanlığı silmek istediğinize emin misiniz?")) {
            deleteHabit(habitId).unwrap()
            setIsEditModalOpen(false);
            setSelectedHabit(null);
        }
    }, );

    const handleMarkComplete = (habitId,isCompletedToday) => {
        const date=new Date().toISOString();
        if(isCompletedToday){
            deleteHabitLog({ habitId ,date}).unwrap()
        }else{

            addHabitLog({ habitId }).unwrap();
        }
    };

    const handleCloseClick = () => {
        setIsEditModalOpen(false);
        setSelectedHabit(null);
    }


    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4   rounded-b-xl bg-gray-800   ">

                {data?.value && data.value.map((habit) => {
                    return (
                        <HabitCard key={habit.id} habit={habit} onEdit={handleEditClick} onDelete={handleDeleteClick} onMarkComplete={handleMarkComplete} />
                    );
                })}
            </div>
            {selectedHabit && (
                <NewHabitModal
                    open={isEditModalOpen}
                    onClose={handleCloseClick}
                    habit={selectedHabit}
                    onSave={handleEditSave}
                />
            )}
        </>
    );
}
export default HabitList;