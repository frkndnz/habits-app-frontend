import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../../features/habits/fetchHabit";
import { updateHabit } from "../../features/habits/updateHabit";
import { deleteHabit } from "../../features/habits/deleteHabit";
import { addHabitLog } from "../../features/habitLogs/addHabitLog";
import HabitCard from "./HabitCard";
import EditHabitModal from "./EditHabitModal";
import { selectAllHabits,selectHabitIds } from "../../features/habits/habitSlice";

const HabitList = () => {

    const dispatch = useDispatch();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const handleEditClick = (habit) => {
        setSelectedHabit(habit);
        setIsEditModalOpen(true);
    };

    const handleEditSave = (updatedHabit) => {
        dispatch(updateHabit(updatedHabit));
        setIsEditModalOpen(false);
    }
    const handleDeleteClick =useCallback( (habitId) => {
        if (window.confirm("Bu alışkanlığı silmek istediğinize emin misiniz?")) {
            dispatch(deleteHabit(habitId));
            setIsEditModalOpen(false);
            setSelectedHabit(null);
        }
    }, [dispatch]);

    const handleMarkComplete =  (habitId) => {
        dispatch(addHabitLog({ habitId }));
    };

    //const {isLoading, isSuccess, errorMessages } = useSelector((state) => state.habit);
    
    const habitIds=useSelector(selectHabitIds);

    useEffect(() => {
        dispatch(fetchHabits());
    }, []);

    

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">

                { habitIds.map((id) => {
                    return (
                        <HabitCard key={id} habitId={id} onEdit={handleEditClick} onDelete={handleDeleteClick} onMarkComplete={handleMarkComplete} />
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