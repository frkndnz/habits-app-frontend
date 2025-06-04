import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Jar = ({ habits, title }) => {
    return (
        <div className="relative w-64 h-[350px] mx-auto flex flex-col items-center justify-end overflow-hidden">
            {/* Kavanozun Boynu (üst kısım) */}
            <div className="absolute top-0 w-40 h-8 bg-gray-300 rounded-b-xl rounded-t-lg z-20"></div>

            {/* Kavanozun Gövdesi */}
            <div className="relative w-full h-full border-x-4 border-b-4 border-blue-200 rounded-b-[4rem] bg-gradient-to-b from-blue-50 to-blue-100 shadow-xl pt-16 flex flex-col justify-end items-center px-4 pb-4">
                {/* Başlık */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
                    <h3 className="text-center font-bold text-lg text-slate-700 bg-white/80 px-4 py-1 rounded-full shadow-sm border border-slate-200 backdrop-blur-sm">
                        {title}
                    </h3>
                </div>

                {/* Habit öğeleri için flex kapsayıcı */}
                {/* Buradaki değişiklikler */}
                <div className="flex  flex-wrap-reverse gap-2 justify-start   relative z-0">
                    <AnimatePresence>
                        {habits.map((habit) => (
                            <motion.div
                                key={habit.id}
                                layoutId={habit.id}
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    y: 200
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
                                className="w-12 h-12 rounded-full text-white flex items-center justify-center text-sm font-semibold"
                                style={{ 
                                    backgroundColor: habit.color || '#3b82f6',
                                    boxShadow: `0 4px 12px ${habit.color || '#3b82f6'}40, inset 0 1px 2px rgba(255,255,255,0.3)`
                                }}
                            >
                                {habit.name.charAt(0)}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Kavanozun Alt Gölgesi */}
            <div className="absolute -bottom-2 w-48 h-8 bg-gray-400 rounded-full blur-md opacity-50"></div>
        </div>
    );
};

export default Jar;