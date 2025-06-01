import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../../features/habits/fetchHabit";
import { updateHabit } from "../../features/habits/updateHabit";
import { deleteHabit } from "../../features/habits/deleteHabit";
import HabitCard from "./HabitCard";
import EditHabitModal from "./EditHabitModal";
const HabitList = () => {

    const dispatch = useDispatch();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const handleEditClick = (habit) => {
        setSelectedHabit(habit);
        setIsEditModalOpen(true);
    }

    const handleEditSave = (updatedHabit) => {
        dispatch(updateHabit(updatedHabit));
        setIsEditModalOpen(false);
    }
    const handleDeleteClick = (habitId) => {
        if (window.confirm("Bu alışkanlığı silmek istediğinize emin misiniz?")) {
            dispatch(deleteHabit(habitId));
            setIsEditModalOpen(false);
            setSelectedHabit(null);
        }
    }

    const { habits, isLoading, isSuccess, errorMessages } = useSelector((state) => state.habit);

    useEffect(() => {
        dispatch(fetchHabits());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading habits...</div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">

                {habits != null && habits.map((habit) => {
                    return (
                        <HabitCard key={habit.id} habit={habit} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                    );
                })}
            </div>
            {selectedHabit && (
                <EditHabitModal
                    open={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    habit={selectedHabit}
                    onSave={handleEditSave}
                />
            )}
        </>
    );
}
export default HabitList;