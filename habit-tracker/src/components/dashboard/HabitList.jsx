import React, { useState, useCallback ,useRef} from "react";
import HabitCard from "./HabitCard";
import NewHabitModal from "./NewHabitModal";
import { useGetHabitsQuery } from "../../features/habits/habitApi";
import { useDeleteHabitMutation } from "../../features/habits/habitApi";
import { useUpdateHabitMutation } from "../../features/habits/habitApi";
import { useAddHabitLogMutation } from "../../features/habitLogs/habitLogApi";
import { useDeleteHabitLogMutation } from "../../features/habitLogs/habitLogApi";
const HabitList = () => {


    const { data } = useGetHabitsQuery();




    const [deleteHabit] = useDeleteHabitMutation();
    const [updateHabit] = useUpdateHabitMutation();
    const [addHabitLog] = useAddHabitLogMutation();
    const [deleteHabitLog] = useDeleteHabitLogMutation();
  
const dataRef = useRef(null);
dataRef.current = data;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const handleEditClick = useCallback((habitId) => {
        const habit = dataRef.current?.value.find(h => h.id === habitId);
        if (!habit) return;
        setSelectedHabit(habit);
        setIsEditModalOpen(true);
    }, []);

    const handleEditSave = useCallback(async (updatedHabit) => {
        try {
            await updateHabit(updatedHabit).unwrap();
            setIsEditModalOpen(false);
        } catch (err) {
            console.error("Güncelleme başarısız:", err);
        }
    }, [updateHabit]);


    const handleDeleteClick = useCallback((habitId) => {
        if (window.confirm("Bu alışkanlığı silmek istediğinize emin misiniz?")) {
            deleteHabit(habitId).unwrap()
            setIsEditModalOpen(false);
            setSelectedHabit(null);
        }
    }, [deleteHabit]);

    const handleMarkComplete = useCallback((habitId, isCompletedToday) => {
        const date = new Date().toISOString();
        if (isCompletedToday) {
            deleteHabitLog({ habitId, date }).unwrap()
        } else {

            addHabitLog({ habitId }).unwrap();
        }
    }, [addHabitLog, deleteHabitLog]);

    const handleCloseClick = useCallback(() => {
        setIsEditModalOpen(false);
        setSelectedHabit(null);
    }, []);


    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4   rounded-b-xl bg-gray-800   ">

                {data?.value && data.value.map((habit) => {
                    return (
                        <HabitCard key={habit.id} habitId={habit.id} onEdit={handleEditClick} onDelete={handleDeleteClick} onMarkComplete={handleMarkComplete} />
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