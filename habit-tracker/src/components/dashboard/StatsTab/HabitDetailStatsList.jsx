import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetHabitDetailsQuery } from "../../../features/stats/statsApi";

export const HabitDetailStatsList = () => {

    const { data, isLoading, isError } = useGetHabitDetailsQuery();

    if (isLoading) return <div>Loading...</div>

    if (isError || !data) return <div>Error loading details..</div>

    const habits = data.value;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit) => {
                return (
                    <Card key={habit.id} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        <CardHeader className="text-xl font-semibold">
                        {habit.name}
                        </CardHeader>
                        <CardContent>
                            <p></p>
                        </CardContent>
                    </Card>
                )
            })}

        </div>
    )
}