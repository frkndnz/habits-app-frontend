import { useGetHabitsQuery } from "../../features/habits/habitApi";
import Jar from "./Jar";

export const JarSection = () => {
    const { data } = useGetHabitsQuery();
    const completeHabits = data?.value?.filter(habit => habit.isCompletedToday) || [];
    const incompleteHabits = data?.value?.filter(habit => !habit.isCompletedToday) || [];
    const completedCount = completeHabits.length;
let completedText = "";

if (completedCount === 0) {
  completedText = "Henüz tamamlanmış alışkanlığın yok. Hadi ilkini işaretle!";
} else if (completedCount === 1) {
  completedText = "Harika! Bugün ilk alışkanlığı tamamladın.";
} else {
  completedText = `Harika! Bugün ${completedCount} alışkanlığı tamamladın.`;
}
    return (
        < div className=" bg-gray-800 rounded-t-xl">
            <div className="grid grid-cols-2 gap-2 p-4">
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
          <h2 className='text-center  text-sm sm:text-lg font-semibold text-teal-400 mt-4 px-2'>
  {completedText}
</h2>
        </div>
    );
};
