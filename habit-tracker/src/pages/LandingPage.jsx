import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Target, CheckCircle, Smartphone, Activity, Star, Clock, Rocket } from "lucide-react";
import Lottie from "lottie-react";
import habitAnimation from "../assets/lottie/habit.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { HowItWorks } from "../components/landing/HowItWorks";
import { Testimonials } from "../components/landing/Testimonials";
import { ScreenShots } from "../components/landing/ScreenShots";

export default function LandingPage() {
  
  const navigate = useNavigate();
  const featureList = [
    {
      title: 'Smart Tracking',
      descripion: 'Track your habits intelligently with automatic insigths',
      icon: Target
    },
    {
      title: 'Custom Reminders',
      descripion: 'Never miss a habit with timely custom alerts',
      icon: Clock
    },
    {
      title: 'Visual Progress',
      descripion: 'See your growth visually and stay motivated',
      icon: Activity
    },
    {
      title: 'Smart Tracking',
      descripion: 'Track your habits intelligently with automatic insigths',
      icon: Star
    },

  ];

  return (
    <div className="flex flex-col gap-20 py-10 px-4 sm:px-10 bg-gray-900 overflow-hidden text-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 text-center lg:text-left px-4 sm:px-10"
      >
        {/* Text Section */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-400 mb-4 ">
            Build Habits That Stick
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
            Stay consistent with our modern habit tracker app, designed for growth and momentum.
          </p>
          <button
            onClick={() => navigate("/auth/register")}
            className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition shadow-lg">
            Get Started
          </button>
        </div>

        {/* Animation Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Lottie
            animationData={habitAnimation}
            loop={true}
            className="w-full max-w-md"
          />
        </div>
      </motion.section>

      <HowItWorks/>
      <ScreenShots/>
      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-teal-300 mb-6">
          Why Choose Our App?
        </h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {featureList.map((feature, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-xl shadow-md text-center h-64 flex flex-col justify-center border border-gray-700"
              >
                <div className="mx-auto inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8" size={36} ></feature.icon>
                 
                </div>
                <h3 className="text-xl font-semibold text-teal-400 mb-2">{feature.title}</h3>
                <p className="text-gray-200">
                  {feature.descripion}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>


      <Testimonials/>
      

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-center border border-gray-700 shadow-lg max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-teal-300 mb-2 flex justify-center items-center gap-2">
          <Rocket className="w-6 h-6 text-teal-400" />
          Start building better habits today
        </h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          Join thousands building better habits with our easy-to-use tracker. It’s free, forever.
        </p>
        <button onClick={() => navigate("/auth/register")} className="px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition duration-300 transform hover:scale-105 shadow-md">
          Sign Up Free
        </button>
      </motion.section>

    </div>
  );
}
