import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetHabitDetailsQuery } from "../../../features/stats/statsApi";
import { Trophy, Zap, Target, CheckCircle, XCircle, BarChart3 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import { useRef } from "react";
export const HabitDetailStatsList = () => {

    const { data, isLoading, isError } = useGetHabitDetailsQuery();

    if (isLoading) return <div>Loading...</div>

    if (isError || !data) return <div>Error loading details..</div>

    
    const habits = data?.value;

    const getColorClasses = (colorCode) => {
        // Hex color kodunu daha koyu bir tona çevirmek için
        const lightenColor = (color, amount = 20) => {
            const hex = color.replace('#', '');
            const num = parseInt(hex, 16);
            const r = Math.min(255, (num >> 16) + amount);
            const g = Math.min(255, (num >> 8 & 0x00FF) + amount);
            const b = Math.min(255, (num & 0x0000FF) + amount);
            return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
        };

        const darkenColor = (color, amount = 20) => {
            const hex = color.replace('#', '');
            const num = parseInt(hex, 16);
            const r = Math.max(0, (num >> 16) - amount);
            const g = Math.max(0, (num >> 8 & 0x00FF) - amount);
            const b = Math.max(0, (num & 0x0000FF) - amount);
            return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
        };

        const lightColor = lightenColor(colorCode, 10);
        const darkColor = darkenColor(colorCode, 30);

        return {
            gradient: `linear-gradient(135deg, ${colorCode} 0%, ${darkColor} 100%)`,
            border: `${colorCode}50` // 50% opacity for border
        };
    };

    return (

        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            {/* Genel Başlık */}
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                        <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Alışkanlıkların Detaylı İstatistiği
                    </h2>
                </div>
                <p className="text-white text-lg max-w-2xl mx-auto">
                    Alışkanlıklarınızın gelişimini takip edin ve başarılarınızı kutlayın
                </p>
            </div>

            {/* Swiper Carousel */}
            <div className=" ">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    loop={true}
                    spaceBetween={24}
                    slidesPerView={1}
                    centeredSlides={false}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 32 },
                        1280: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                    className="  "
                >
                    {habits.map((habit) => {
                        const colorStyles = getColorClasses(habit.color);
                        return (
                            <SwiperSlide key={habit.id}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full p-2"
                                >
                                    <Card
                                        className=" group relative overflow-hidden border-2 text-white shadow-2xl transition-all duration-300 hover:shadow-3xl h-full"
                                        style={{
                                            background: colorStyles.gradient,
                                            borderColor: colorStyles.border
                                        }}
                                    >
                                        {/* Glassmorphism overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                        {/* Decorative elements */}
                                        <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/10 blur-xl"></div>
                                        <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-white/5 blur-2xl"></div>

                                        <CardHeader className="relative z-10 ">
                                            <h3 className="text-xl font-bold text-white tracking-wide text-center">
                                                {habit.name}
                                            </h3>
                                        </CardHeader>

                                        <CardContent className="relative z-10 space-y-4 pb-6">
                                            {/* Total Completions */}
                                            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                                                <div className="rounded-full bg-white/20 p-2 flex-shrink-0">
                                                    <Trophy className="h-5 w-5 text-yellow-300" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-white/80 font-medium uppercase tracking-wide">
                                                        Toplam Tamamlanan
                                                    </p>
                                                    <p className="text-lg font-bold text-white">
                                                        {habit.totalCompletions}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Best Streak */}
                                            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                                                <div className="rounded-full bg-white/20 p-2 flex-shrink-0">
                                                    <Zap className="h-5 w-5 text-orange-300" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-white/80 font-medium uppercase tracking-wide">
                                                        En İyi Seri
                                                    </p>
                                                    <p className="text-lg font-bold text-white">
                                                        {habit.bestStreak} gün
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Current Streak */}
                                            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                                                <div className="rounded-full bg-white/20 p-2 flex-shrink-0">
                                                    <Target className="h-5 w-5 text-blue-300" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-white/80 font-medium uppercase tracking-wide">
                                                        Mevcut Seri
                                                    </p>
                                                    <p className="text-lg font-bold text-white">
                                                        {habit.currentStreak} gün
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Today Status */}
                                            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                                                <div className="rounded-full bg-white/20 p-2 flex-shrink-0">
                                                    {habit.isCompletedToday ? (
                                                        <CheckCircle className="h-5 w-5 text-green-300" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5 text-red-300" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-white/80 font-medium uppercase tracking-wide">
                                                        Bugün
                                                    </p>
                                                    <p className="text-lg font-bold text-white">
                                                        {habit.isCompletedToday ? "Tamamlandı ✓" : "Henüz değil"}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    )
}