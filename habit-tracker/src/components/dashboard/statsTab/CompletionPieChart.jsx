import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { useGetHabitsQuery } from "../../../features/habits/habitApi";



const COLORS = ['#22c55e', '#ef4444'];


export const CompletionPieChart = () => {


    const { data } = useGetHabitsQuery();

    const habits = data?.value;

   


    const completedCount =habits ? habits?.filter(h => h.isCompletedToday).length :0;
    const incompletedCount = habits ? habits?.length - completedCount:0;
    const chartData = [
        { name: 'Completed', value: completedCount },
        { name: 'InCompleted', value: incompletedCount }
    ];

    return (
        <div className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-2xl shadow-md w-full  mx-auto mt-6  h-[400px] ">
            <h2 className="text-xl font-bold text-white mb-4 ">Daily completion rate</h2>
                <PieChart width={250} height={250} className="px-4 ">
                    <Pie
                        data={chartData}
                        cx='50%'
                        cy='50%'
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey='value'
                        label
                        labelPosition="outside"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]}></Cell>
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            
        </div>
    );
}