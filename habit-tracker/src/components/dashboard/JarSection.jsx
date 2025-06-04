import { useGetHabitsQuery } from "../../features/habits/habitApi";
import Jar from "./Jar";

export const JarSection = () => {
    const { data } = useGetHabitsQuery();
    const completeHabits = data?.value?.filter(habit => habit.isCompletedToday) || [];
    const incompleteHabits = data?.value?.filter(habit => !habit.isCompletedToday) || [];

    return (
        <div className="grid grid-cols-2 gap-8 p-4 bg-gray-800 rounded-t-xl">
            <Jar
                title="Incomplete"
                habits={incompleteHabits}
                layoutPrefix="incomplete"
            />
            <Jar
                title="Complete"
                habits={completeHabits}
                layoutPrefix="complete"
            />
        </div>
    );
};
