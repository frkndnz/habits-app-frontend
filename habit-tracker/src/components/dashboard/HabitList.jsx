import React, { useState, useCallback, useRef, useMemo } from "react";
import HabitCard from "./HabitCard";
import NewHabitModal from "./NewHabitModal";
import { useGetHabitsQuery } from "../../features/habits/habitApi";
import { useDeleteHabitMutation } from "../../features/habits/habitApi";
import { useUpdateHabitMutation } from "../../features/habits/habitApi";
import { useAddHabitLogMutation } from "../../features/habitLogs/habitLogApi";
import { useDeleteHabitLogMutation } from "../../features/habitLogs/habitLogApi";
import FilterPanel from "./FilterPanel";
import { lazy, Suspense } from "react";

const RecommendedReads=lazy(()=> import("@/components/blogs/RecommendedReads"));

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
    
    const [filter,setFilter]=useState({
        status:"all",
        category:"all",
        
    });

    const filteredHabits=useMemo(()=>{
        return dataRef.current?.value?.filter((habit)=>{
            const statusMatch =
        filter.status === "all" ||
        (filter.status === "complete" && habit.isCompletedToday) ||
        (filter.status === "incomplete" && !habit.isCompletedToday);

      const categoryMatch =
        filter.category === "all" || habit.categoryName === filter.category;
        return statusMatch && categoryMatch ;
        })
    },[dataRef.current?.value,filter]);


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
        if (window.confirm("Are you sure you want to delete this habit?")) {
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
            <FilterPanel
                filter={filter}
                onChange={(updated)=> setFilter((prev)=>({...prev,...updated}))}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-16  rounded-b-xl   ">

                {data?.value && filteredHabits.map((habit) => {
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
            <Suspense fallback={<p>Loading...</p>}>
                <RecommendedReads/>
            </Suspense>
        </>
    );
}
export default HabitList;