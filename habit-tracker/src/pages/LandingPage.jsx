import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function LandingPage() {
  const featureList = [
    "Daily Tracking",
    "Visual Progress",
    "Reminder Notifications",
    "Streaks",
    "Dark Mode",
  ];

  return (
    <div className="flex flex-col gap-20 py-10 px-4 sm:px-10 bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-400 mb-4">
          Build Habits That Stick
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Stay consistent with our modern habit tracker app, designed for growth and momentum.
        </p>
        <button className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition shadow-lg">
          Get Started
        </button>
      </motion.section>

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
                className="bg-gray-800 p-6 rounded-xl shadow-md text-center h-full flex flex-col justify-center border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-teal-400 mb-2">{feature}</h3>
                <p className="text-gray-400">
                  Stay on track with smart tools to support your daily goals and long-term vision.
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-teal-300 mb-4">
          Start building better habits today
        </h2>
        <button className="px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition">
          Sign Up Free
        </button>
      </motion.section>
    </div>
  );
}
