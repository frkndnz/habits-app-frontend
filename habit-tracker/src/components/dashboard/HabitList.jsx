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
import { DeleteConfirmation } from "../DeleteConfirmation";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const RecommendedReads = lazy(() => import("@/components/blogs/RecommendedReads"));

const HabitList = () => {

    const { data } = useGetHabitsQuery();

    const [deleteHabit] = useDeleteHabitMutation();
    const [updateHabit] = useUpdateHabitMutation();
    const [addHabitLog] = useAddHabitLogMutation();
    const [deleteHabitLog] = useDeleteHabitLogMutation();
    const navigate=useNavigate();
    const dataRef = useRef(null);
    dataRef.current = data;
    const hasHabits = dataRef.current?.value?.length > 0;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [isDeleteOpen, setDeleteOpen] = useState(false);

    const [filter, setFilter] = useState({
        status: "all",
        category: "all",

    });

    const filteredHabits = useMemo(() => {
        return dataRef.current?.value?.filter((habit) => {
            const statusMatch =
                filter.status === "all" ||
                (filter.status === "complete" && habit.isCompletedToday) ||
                (filter.status === "incomplete" && !habit.isCompletedToday);

            const categoryMatch =
                filter.category === "all" || habit.categoryName === filter.category;
            return statusMatch && categoryMatch;
        })
    }, [dataRef.current?.value, filter]);


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
        const habit = dataRef.current?.value.find(h => h.id === habitId);
        if (!habit) return;
        setSelectedHabit(habit);
        setDeleteOpen(true);

    }, []);

    const handleDeleteClose = useCallback(() => {
        setDeleteOpen(false);
        setSelectedHabit(null);
    }, []);

    const confirmDelete = async () => {
        await deleteHabit(selectedHabit.id).unwrap();
        setIsEditModalOpen(false);
        setSelectedHabit(null);
    }

    const handleMarkComplete = useCallback((habitId, isCompletedToday) => {
        const date = new Date().toISOString();
        if (isCompletedToday) {
            deleteHabitLog({ habitId, date }).unwrap()
        } else {

            addHabitLog({ habitId }).unwrap();
            toast("Habit completed!", {
                description: "You're doing great!",
                icon: "🌟",
                duration: 3000,
                style: {
                    backgroundColor: "#7c3aed", // Tailwind purple-600
                    color: "white",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
                },
                action: {
                    label: "View",
                    onClick: () => navigate(`/dashboard/habits/${habitId}`),
                },
            });
        }
    }, [addHabitLog, deleteHabitLog]);

    const handleCloseClick = useCallback(() => {
        setIsEditModalOpen(false);
        setSelectedHabit(null);
    }, []);


    return (
        <>
            {hasHabits && (

                <FilterPanel
                    filter={filter}
                    onChange={(updated) => setFilter((prev) => ({ ...prev, ...updated }))}
                />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-16  rounded-b-xl   ">

                {data?.value && filteredHabits.map((habit) => {
                    return (
                        <HabitCard key={habit.id} habitId={habit.id} onEdit={handleEditClick} onDelete={handleDeleteClick} onMarkComplete={handleMarkComplete} />
                    );
                })}
            </div>
            {!hasHabits && (
                <p className="text-center text-gray-500 text-lg italic bg-gray-50 border border-dashed border-gray-300 rounded-lg py-8 px-6 shadow-sm max-w-md mx-auto">
                    You don't have the habit yet. Click on the <span className="font-semibold text-teal-600">"New Habit"</span> button to start a new habit!
                </p>
            )}
            {selectedHabit && (
                <NewHabitModal
                    open={isEditModalOpen}
                    onClose={handleCloseClick}
                    habit={selectedHabit}
                    onSave={handleEditSave}
                />
            )}
            {isDeleteOpen && (
                <DeleteConfirmation open={isDeleteOpen} onClose={handleDeleteClose} onDelete={confirmDelete} />
            )}
            <Suspense fallback={<p>Loading...</p>}>
                <RecommendedReads />
            </Suspense>
        </>
    );
}
export default HabitList;