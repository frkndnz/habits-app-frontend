import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../../features/habits/fetchHabit";
import { updateHabit } from "../../features/habits/updateHabit";
import { deleteHabit } from "../../features/habits/deleteHabit";
import { addHabitLog } from "../../features/habitLogs/addHabitLog";
import HabitCard from "./HabitCard";
import NewHabitModal from "./NewHabitModal";
import { selectAllHabits, selectHabitIds } from "../../features/habits/habitSlice";

const HabitList = () => {

    const dispatch = useDispatch();

    const habitIds = useSelector(selectHabitIds);

    useEffect(() => {
        dispatch(fetchHabits());
    }, []);


    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const handleEditClick = (habit) => {
        setSelectedHabit(habit);
        setIsEditModalOpen(true);
    };

    const handleEditSave = (updatedHabit) => {
        console.log("handleEditSave", updatedHabit);
        dispatch(updateHabit(updatedHabit));
        setIsEditModalOpen(false);
    }
    const handleDeleteClick = useCallback((habitId) => {
        if (window.confirm("Bu alışkanlığı silmek istediğinize emin misiniz?")) {
            dispatch(deleteHabit(habitId));
            setIsEditModalOpen(false);
            setSelectedHabit(null);
        }
    }, [dispatch]);

    const handleMarkComplete = (habitId) => {
        dispatch(addHabitLog({ habitId }));
    };

    const handleCloseClick = () => {
        setIsEditModalOpen(false);
        setSelectedHabit(null);
    }


    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 ">

                {habitIds.map((id) => {
                    return (
                        <HabitCard key={id} habitId={id} onEdit={handleEditClick} onDelete={handleDeleteClick} onMarkComplete={handleMarkComplete} />
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