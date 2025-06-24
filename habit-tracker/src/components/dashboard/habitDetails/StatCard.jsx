import React from 'react';

function StatCard({ label, value,color }) {
    return (
        <div className=" rounded-xl border-2 border-teal-400 p-5 text-center shadow-sm"
        style={{borderColor:color}}>
            <p className="text-sm text-gray-600 mb-2">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
    );
}

export default StatCard;