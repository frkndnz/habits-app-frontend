import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Flame, CalendarCheck } from "lucide-react";
import { useGetSummaryStatsQuery } from "@/features/stats/statsApi";

export const SummaryStats = () => {

  const { data, isLoading, isError } = useGetSummaryStatsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading stats</div>;

  const { totalHabits, activeHabits, longestStreakHabitName, longestStreak } = data.value;

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white-900 dark:text-white mb-2">
          My Habits
        </h2>
        <p className="text-white-600 dark:text-gray-400">
          Track your daily habits and build consistency
        </p>
      </div>
      <div className="sm:w-250 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Total Habits Card */}
        <Card className=" group relative overflow-hidden border-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl gap-2">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="flex items-center gap-3 text-white/90 text-base sm:text-lg">
              <div className="rounded-xl bg-yellow-400/20 p-4 backdrop-blur-sm">
                <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-300" />
              </div>
              Total Habits
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-0 text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{totalHabits}</div>
            <div className="text-xs sm:text-sm text-white/70">All time created</div>
          </CardContent>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/5 blur-2xl"></div>
        </Card>

        {/* Active Habits Card */}
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-red-500 via-orange-600 to-yellow-500 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl gap-2">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="flex items-center gap-3 text-white/90 text-base sm:text-lg">
              <div className="rounded-xl bg-red-400/20 p-4 backdrop-blur-sm">
                <Flame className="h-8 w-8 sm:h-10 sm:w-10 text-red-300" />
              </div>
              Active Habits
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-0 text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{activeHabits}</div>
            <div className="text-xs sm:text-sm text-white/70">Habits active in the last 7 days</div>
          </CardContent>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/5 blur-2xl"></div>
        </Card>

        {/* Longest Streak Card */}
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl gap-2">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="flex items-center gap-3 text-white/90 text-base sm:text-lg">
              <div className="rounded-xl bg-green-400/20 p-4 backdrop-blur-sm">
                <CalendarCheck className="h-8 w-8 sm:h-10 sm:w-10 text-green-300" />
              </div>
              Longest Streak
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-0 text-center ">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{longestStreak} days</div>
            <div className="text-xs sm:text-sm text-white/70 font-semibold">{longestStreakHabitName.toUpperCase()}</div>
          </CardContent>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/5 blur-2xl"></div>
        </Card>
      </div>
    </div>
  );
}