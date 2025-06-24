import { useParams, useNavigate } from "react-router-dom";
import { useGetHabitByIdQuery } from "../../features/habits/habitApi";
import { PulseLoader } from 'react-spinners';
import { Button } from "@/components/ui/button";
import StatCard from "../../components/dashboard/habitDetails/StatCard";
import { DailyTracker } from "../../components/dashboard/habitDetails/DailyTracker";
import ProgressChart from "../../components/dashboard/habitDetails/ProgressChart";
import HabitCard from "../../components/dashboard/HabitCard";



export const HabitDetailPage = () => {

    const { habitId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetHabitByIdQuery(habitId);

    const habit = data?.value;
    console.log(habit);
    if (isLoading) return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className='sweet-loading'>
                <PulseLoader
                    color={'#36cba7'}
                    loading={true}
                    size={50}
                    aria-label='Loading Spinner'
                    data-testid="loader"
                />
            </div>
        </div>
    )
    if (error || !habit) return <p>Habit bulunamadı.</p>;


    return (
        <div className="container mx-auto p-8 max-w-4xl bg-white rounded-lg shadow-md">
            {/* Geri Butonu */}
            <div className="mb-6 flex justify-start border-b border-gray-300 pb-4">
                <Button
                    onClick={() => navigate(-1)}
                    className=" !hover:bg-white-300 text-black cursor-pointer"
                    style={{
        background: habit.color // Doğrudan renk kodunu kullan
    }}
                >
                    ← Back
                </Button>
            </div>

            {/* Başlık ve Meta Bilgiler */}
            <div className="mb-8 px-2 sm:px-6">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    {habit.name}
                </h3>

                {/* Kategori ve Oluşturulma Tarihi */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm sm:text-base text-gray-500">
                    <p className="mb-1 sm:mb-0 text-white rounded-lg p-2" style={{backgroundColor:habit.color}}>
                        <span className="font-semibold " >Category :</span> {habit.categoryName}
                    </p>
                    <p>
                        <span className="font-semibold text-black">Created At:</span>{" "}
                        {new Date(habit.createdAt).toLocaleDateString("tr-TR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>

                {/* Açıklama */}
                <p className="mt-4 text-left text-lg text-gray-600">{habit.description}</p>
            </div>

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-10 px-2 sm:px-0">
                <StatCard label="Completion Rate" value={`${habit.completionRate}%`} color={habit.color} />
                <StatCard label="Days Tracked" value={habit.daysTracked} color={habit.color} />
                <StatCard label="Best Streak" value={habit.bestStreak} color={habit.color}/>
                 <StatCard label="Current Streak" value={habit.currentStreak} color={habit.color}/>
            </div>

            {/* Daily Tracker */}
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">

            
            <div className="mb-10 w-full ">
                <h2 className="text-left text-2xl font-semibold mb-4 text-gray-800 px-2 sm:px-0">
                    Daily Tracker
                </h2>
                <div className="border-2  rounded-lg shadow-md p-4 sm:p-6"style={{borderColor:habit.color}}>
                    <DailyTracker dailyLogs={habit.dailyLogs} />
                </div>
            </div>

            {/* Habit Progress */}
            <div className="mb-6 w-full">
                <h2 className="text-left text-2xl font-semibold mb-4 text-gray-800 px-2 sm:px-0">
                    Habit Progress
                </h2>
                <div className="border-2 border-gray-200 rounded-lg shadow-sm p-4 sm:p-6" style={{borderColor:habit.color}}>
                    <ProgressChart progressData={habit.progress} />
                </div>
            </div>
            </div>
        </div>

    )
}