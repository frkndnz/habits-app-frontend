
export const DailyTracker = ({ dailyLogs }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thirtyDaysData = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        
        
        const logForDay = dailyLogs.find(log => {
            const logDate = new Date(log.date);
            return logDate.toDateString() === date.toDateString();
        });
        
        thirtyDaysData.push({
            date: date,
            isCompleted: logForDay ? logForDay.isCompleted : false,
        });
    }

    const firstDayOfWeek = thirtyDaysData[0] ? thirtyDaysData[0].date.getDay() : new Date().getDay();

    const displayDays = Array(firstDayOfWeek).fill(null).concat(thirtyDaysData);

    const daysOfWeekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const monthName = today.toLocaleString('en-US', { month: 'long' });

    return (
        <div className="flex flex-col items-center">
            <div className="text-xl font-medium text-gray-700 mb-4">
                {monthName}
            </div>

            <div className="w-full max-w-sm">
                <div className="grid grid-cols-7 gap-1 mb-2 font-semibold text-gray-700 text-sm">
                    {daysOfWeekLabels.map((day, index) => (
                        <span key={index} className="text-center">{day}</span>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {displayDays.map((dayData, index) => {
                        if (dayData === null) {
                            return <div key={`empty-${index}`} className="w-full pb-[100%]"></div>;
                        }

                        return (
                            <div
                                key={dayData.date.toISOString()}
                                className={`
                                    relative w-full pb-[100%] rounded-sm cursor-pointer
                                    ${dayData.isCompleted ? 'bg-green-600' : 'bg-gray-200'}
                                    hover:ring-2 hover:ring-green-400 hover:ring-offset-1
                                    flex items-center justify-center text-xs font-semibold
                                    ${dayData.date.toDateString() === today.toDateString() ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
                                `}
                            >
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-700">
                                    {dayData.date.getDate()}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DailyTracker;