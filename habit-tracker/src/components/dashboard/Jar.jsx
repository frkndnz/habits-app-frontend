import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Jar = ({ habits, title }) => {

    const colorClasses = {
        green: "from-green-500 to-white-500",
        red: "from-red-500 to-white-600",
    };


    const color = title === "Complete" ? "green" : "red"; // Yeşil tamamlananlar için, mavi tamamlanmayanlar için
    return (
        <>

            <div className="relative w-32 sm:w-64 h-32 sm:h-64 mx-auto flex flex-col items-center justify-end overflow-hidden ">
                {/* Kavanozun Boynu (üst kısım) */}
                <div className="absolute top-0 w-25 sm:w-40 h-4 sm:h-8 bg-gray-300 rounded-b-xl rounded-t-lg z-20"></div>

                {/* Kavanozun Gövdesi */}
                <div
                    className={`relative w-full h-full border-x-4 border-b-4 border-blue-200 rounded-b-[4rem] shadow-xl pt-6 flex flex-col  px-4 pb-4 bg-gradient-to-b ${colorClasses[color]} `}
                >
                    {/* Başlık */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30">
                        <h3 className="text-center font-bold text-[10px] sm:text-lg text-slate-700 bg-white/80 px-4 py-1 rounded-full shadow-sm border border-slate-200 backdrop-blur-sm">
                            {title}
                        </h3>
                    </div>

                    {/* Habit öğeleri için kaydırılabilir flex kapsayıcı */}
                    <div
                        className="flex flex-wrap-reverse gap-y-1 gap-x-2 justify-center content-start relative z-0 w-full h-full overflow-y-auto pt-2 pb-2"
                        // Webkit tabanlı tarayıcılarda kaydırma çubuğunu gizle
                        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <AnimatePresence>
                            {habits.map((habit) => (
                                <motion.div
                                    key={habit.id}
                                    layoutId={habit.id}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        y: 200 // Başlangıçta aşağıdan gelme efekti
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.4,
                                            ease: "easeOut"
                                        }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: [0, -100, 0],
                                        x: habit.id % 2 === 0 ? [0, -50, -100] : [0, 50, 100],
                                        transition: {
                                            duration: 0.8,
                                            ease: "easeOut"
                                        }
                                    }}
                                    layout
                                    transition={{
                                        layout: {
                                            duration: 0.6,
                                            ease: "easeInOut"
                                        }
                                    }}
                                    className="relative group w-6 sm:w-9 h-6 sm:h-9 rounded-full text-white flex items-center justify-center text-sm font-semibold"
                                    style={{
                                        backgroundColor: habit.color || '#3b82f6',
                                        boxShadow: `0 4px 12px ${habit.color || '#3b82f6'}40, inset 0 1px 2px rgba(255,255,255,0.3)`
                                    }}
                                >
                                    {habit.name.charAt(0)}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                                        {habit.name}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Jar;