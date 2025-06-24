import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const ProgressChart = ({ progressData }) => {
    
    const formattedData = progressData.map(point => ({
       
        date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        totalComplete: point.totalLogsUntilNow,
    }));

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart
                data={formattedData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> {/* Arka plan çizgileri */}
                <XAxis
                    dataKey="date"
                    tick={{ fill: '#6b7280', fontSize: 12 }} // Gri renk, küçük font
                    tickLine={false} // X ekseni üzerindeki küçük çizgileri kaldır
                    axisLine={{ stroke: '#e0e0e0' }} // X ekseni çizgisinin rengi
                />
                <YAxis
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: '#e0e0e0' }}
                    domain={[0, 'dataMax + 10']} // Y ekseni max değeri, verinin maksimumundan biraz fazla olsun
                />
                <Tooltip
                    cursor={{ stroke: '#9ca3af', strokeWidth: 1 }} // Tooltip çizgisi
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '4px' }}
                    labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                    itemStyle={{ color: '#4b5563' }}
                />
                <Line
                    type="monotone" // Yumuşak çizgi
                    dataKey="totalComplete" // Veri noktalarını çizeceğimiz alan
                    stroke="#4CAF50" // Yeşil renk (Material Design Green 500)
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#4CAF50', stroke: '#fff', strokeWidth: 2 }} // Nokta stilleri
                    activeDot={{ r: 6, fill: '#388E3C', stroke: '#fff', strokeWidth: 2 }} // Aktif nokta stilleri
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ProgressChart;