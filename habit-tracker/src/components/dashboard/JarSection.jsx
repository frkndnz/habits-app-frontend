import { useState } from "react";
import { useGetHabitsQuery } from "../../features/habits/habitApi";
import Jar from "./Jar";
import { ChevronUp, ChevronDown } from "lucide-react";



export const JarSection = () => {


const [isOpen, setIsOpen] = useState(true);



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
    < div className={`${isOpen ? "sticky":""} top-0 backdrop-blur-[2px] z-10  rounded-t-xl shadow-sm`} >

      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-white-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
        >
          {isOpen ? <ChevronUp size={40} /> : <ChevronDown size={40} />}
        </button>
      </div>

      {isOpen && (
        <>
      
      <div className="grid grid-cols-2 ">
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
      
        </>
      )}
      {!isOpen && (
        <>
        <h2 className='text-center  text-sm sm:text-lg font-semibold text-white mt-4  p-2 rounded-lg bg-gray-600 w-1/3 mx-auto'>
        {completedText}
      </h2>
        </>
      )}
    </div>
    
  );
};
