import React from "react";
import { Pencil, Trash2, CheckCircle } from "lucide-react";
import { useGetHabitsQuery } from "../../features/habits/habitApi";


const HabitCard = React.memo(({ habitId, onEdit, onDelete, onMarkComplete }) => {

    const { habit } = useGetHabitsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            habit: data?.value.find(h => h.id === habitId)
        })
    });
    if (!habit)
        return null;

    console.log("HabitCard render", habit);

    return (
        <div
            className="group relative p-3 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm flex flex-col justify-between h-full overflow-hidden"
            style={{
                background: `linear-gradient(135deg, ${habit.color}95, ${habit.color}CC)`,
            }}
        >
            {/* Completion Badge */}
            <div className="absolute top-4 right-4">
                {habit.isCompletedToday && (
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-sm"></div>
                )}
            </div>

            {/* Content */}
            <div className="mb-6 mt-4 sm:mt-0">
                <h3 className="  text-[10px]  sm:text-base md:text-lg  font-bold text-white mb-2 tracking-wide truncate">
                    {habit.name.toUpperCase()}
                </h3>
                <h2
                    className="border border-blue-400 rounded-full w-fit px-4 py-1 mx-auto mb-4 text-white  font-semibold text-sm tracking-wide bg-blue-400/10 shadow-sm backdrop-blur-md"
                >
                    {habit.categoryName.toUpperCase()}
                </h2>

                <div className="flex items-center gap-2">
                    {habit.isCompletedToday ? (
                        <div className="flex items-center gap-2 text-white/90">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span className="text-sm font-medium">Tamamlandı</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-white/80">
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                            <span className="text-sm">Henüz tamamlanmadı</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
                {/* Left side - Status button */}
                <button
                    title={habit.isCompletedToday ? "Tamamlandı işaretini kaldır" : "Tamamlandı olarak işaretle"}
                    className={`
        relative p-2 sm:p-3 rounded-xl transition-all duration-300 border 
        ${habit.isCompletedToday
                            ? "bg-green-500 hover:bg-green-600 border-green-600 text-white"
                            : "bg-white/10 hover:bg-white/20 border-white/30 text-white/70"
                        }
    `}
                    onClick={() => onMarkComplete(habit.id, habit.isCompletedToday)}
                >
                    <CheckCircle
                        size={20}
                        className={`transition-all duration-200 ${habit.isCompletedToday
                            ? "text-white"
                            : "group-hover/btn:text-white"
                            }`}
                    />

                    {habit.isCompletedToday && (
                        <div className="absolute -top-2 -right-2 bg-white text-green-700 text-xs px-2 py-0.5 rounded-full shadow-sm">
                            ✓
                        </div>
                    )}

                    {/* Ping efekti sadece tamamlandığında */}
                    {habit.isCompletedToday && (
                        <div className="absolute inset-0 bg-green-400/30 rounded-xl animate-ping"></div>
                    )}
                </button>


                {/* Right side - Edit/Delete buttons */}
                <div className="flex gap-1 sm:gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        title="Edit Habit"
                        className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 hover:scale-110"
                        onClick={() => onEdit(habit.id)}
                    >
                        <Pencil size={16} className="text-white" />
                    </button>
                    <button
                        title="Delete Habit"
                        className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-red-500/80 transition-all duration-200 hover:scale-110"
                        onClick={() => onDelete(habit.id)}
                    >
                        <Trash2 size={16} className="text-white" />
                    </button>
                </div>
            </div>

            {/* Subtle bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-b-2xl"></div>
        </div>
    )
}


);

export default HabitCard;