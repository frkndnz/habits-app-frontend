import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { useGetHabitsQuery } from "../../../features/habits/habitApi";



const COLORS = ['#22c55e', '#ef4444'];


export const CompletionPieChart = () => {


    const { data } = useGetHabitsQuery();

    const habits = data?.value;




    const completedCount = habits ? habits?.filter(h => h.isCompletedToday).length : 0;
    const incompletedCount = habits ? habits?.length - completedCount : 0;
    const chartData = [
        { name: 'Completed', value: completedCount },
        { name: 'InCompleted', value: incompletedCount }
    ];

    return (
        <div className="flex flex-col items-center justify-center bg-chart-3 p-4 rounded-2xl shadow-md mx-auto mt-6 w-full max-w-sm sm:max-w-md h-[250px] sm:h-[400px]">
    <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-4">Daily completion rate</h2>
    <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
            <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                 innerRadius="35%"
                outerRadius="60%"
                paddingAngle={3}
                dataKey="value"
                label={({percent}) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            <Legend 
                wrapperStyle={{fontSize: '16px'}}
                iconSize={8}
            />
        </PieChart>
    </ResponsiveContainer>
</div>
    );
}