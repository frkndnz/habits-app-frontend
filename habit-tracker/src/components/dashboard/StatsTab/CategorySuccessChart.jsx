import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import { useGetCategoryStatsQuery } from '../../../features/stats/statsApi';

// Örnek veri
const dataTest = [
  { categoryName: "Sağlık", successRate: 72.73, habitsCount: 9 },
  { categoryName: "Eğitim", successRate: 50.0, habitsCount: 4 },
  { categoryName: "Kategorisiz", successRate: 25.0, habitsCount: 12 },
  { categoryName: "Kategorisiz", successRate: 25.0, habitsCount: 12 },
  { categoryName: "Kategorisiz", successRate: 25.0, habitsCount: 12 },
  
];

// Tooltip bileşeni
const CustomComboTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const success = payload.find(p => p.dataKey === 'successRate');
    const count = payload.find(p => p.dataKey === 'habitCount');

    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        {success && <p style={{ color: success.color }}>{`Success Rate: ${success.value.toFixed(2)}%`}</p>}
        {count && <p style={{ color: count.color }}>{`Number of Habits: ${count.value}`}</p>}
      </div>
    );
  }
  return null;
};

const CategorySuccessChart = () => {


  const {data,error}=useGetCategoryStatsQuery();




  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-2xl shadow-md w-full  mx-auto mt-6 h-[400px] ">
      <h2 className="text-xl font-bold text-white mb-4">
       Success Rate and Number of Habits by Category
      </h2>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data?.value}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="categoryName" tick={{ fill: '#FFFFFF', fontSize: 10 }  } />
            
            <YAxis
              yAxisId="left"
              orientation="left"
              domain={[0, 100]}
              tickFormatter={(val) => `${val}%`}
              tick={{ fill: '#10b981', fontSize: 13 }}
              stroke="#10b981"
            />
            
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 15]}
              tick={{ fill: '#3b82f6', fontSize: 13 }}
              stroke="#3b82f6"
            />

            <Tooltip content={<CustomComboTooltip />} />
            <Legend />

            <Bar
              yAxisId="left"
              dataKey="successRate"
              fill="#10b981"
              barSize={50}
              radius={[10, 10, 0, 0]}
              name="Success Rate (%)"
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="habitCount"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Number of Habits"
              dot={{ r: 6, fill: '#3b82f6' }}
              activeDot={{ r: 8 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategorySuccessChart;
