import { useState } from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
export const ScreenShots = () => {

    const imageSrc = "/images/mockup.jpg";
    return (
        <section className="w-full py-16 ">
      <div className="container mx-auto flex flex-col lg:flex-col gap-12 items-center  px-4 sm:px-6 lg:px-8">
        {/* Solda: Yazılar */}
        <div className="flex-1 text-center lg:text-left">
            <motion.h2
             className="text-3xl md:text-4xl font-bold mb-4 text-teal-400 "
             initial={{opacity:0,y:50}}
             whileInView={{opacity:1,y:0}}
             transition={{duration:0.8,ease:"easeOut"}}
             viewport={{once:false,amount:0.5}}
            >
               
                 See the App in Action
            </motion.h2>
         
          
        </div>

        {/* Sağda: Görsel (Motion ile animasyonlu) */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          
          className="flex-1  w-full max-w-full lg:max-w-4xl xl:max-w-5xl"
        >
          <img
            src={imageSrc}
            alt="Sana Habits App Dashboard Mockup"
            className="w-full h-auto object-contain rounded-xl shadow-xl shadow-gray-400 border-2 border-gray-200"
          />
        </motion.div>
        <p className=" text-base md:text-xl">
            <Typewriter
            words={[
                "Track your habits.",
                "Stay consistent.",
                "Visualize your progress.",
                "Build your routine.",
                "Start small. Win big.",
              ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
            />
            
          </p>
      </div>
    </section>
    );
};