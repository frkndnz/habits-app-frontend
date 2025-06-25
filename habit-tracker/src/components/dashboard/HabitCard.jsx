import React from "react";
import { Pencil, Trash2, CheckCircle } from "lucide-react";
import { useGetHabitsQuery } from "../../features/habits/habitApi";
import { useNavigate } from "react-router-dom";


const HabitCard = React.memo(({ habitId, onEdit, onDelete, onMarkComplete }) => {

    const navigate = useNavigate();
    const { habit } = useGetHabitsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            habit: data?.value.find(h => h.id === habitId)
        })
    });
    if (!habit)
        return null;

    console.log("HabitCard render", habit);

    const handleCardClick = () => {

        navigate(`habits/${habit.id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return (
        <div
            className="group relative p-3 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm flex flex-col justify-between  h-full overflow-hidden  cursor-pointer"
            onClick={handleCardClick}
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
                <h3 className="  text-[10px]  sm:text-base md:text-sm  font-bold text-white mb-2 tracking-wide truncate">
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
                            <span className="text-sm font-medium">Completed</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-white/80">
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                            <span className="text-sm">Not yet completed</span>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    {/* Başlık */}
                    <p className="text-gray-300 text-sm mb-2">This week</p>

                    {/* Gün isimleri */}
                    <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-300 mb-1">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <span key={day}>{day}</span>
                        ))}
                    </div>

                    {/* Gün kutuları */}
                    <div className="grid grid-cols-7 gap-2 justify-items-center">
                        {habit.weeklyLogStatus.map((completed, index) => (
                            <div
                                key={index}
                                className={`
          w-6 sm:w-5  h-6  sm:h-5 rounded-md flex items-center justify-center text-xs font-semibold transition
          ${completed ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-200'}
          hover:scale-105 hover:brightness-110
        `}
                                title={completed ? 'Completed' : 'Not completed'}
                            >
                                {completed ? '✓' : ''}

                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
                {/* Left side - Status button */}
                <button
                    title={habit.isCompletedToday ? "Unmark Completed" : "Mark as completed"}
                    className={`
        relative p-2 sm:p-3 rounded-xl transition-all duration-300 border 
        ${habit.isCompletedToday
                            ? "bg-green-500 hover:bg-green-600 border-green-600 text-white"
                            : "bg-white/10 hover:bg-white/20 border-white/30 text-white/70"
                        }
    `}
                    onClick={(event) => {
                        event.stopPropagation();
                        onMarkComplete(habit.id, habit.isCompletedToday)
                    }
                    }
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
                        onClick={(event) => {
                            event.stopPropagation();
                            onEdit(habit.id)
                        }
                        }
                    >
                        <Pencil size={16} className="text-white" />
                    </button>
                    <button
                        title="Delete Habit"
                        className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-red-500/80 transition-all duration-200 hover:scale-110"
                        onClick={(event) => {
                            event.stopPropagation();
                            onDelete(habit.id)
                        }
                        }
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