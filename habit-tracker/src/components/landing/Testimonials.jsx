import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/pagination'; // Sayfalandırma noktaları için
import 'swiper/css/navigation'; // Ok butonları için (isteğe bağlı)
import 'swiper/css/autoplay';

const testimonials = [
    {
        id: 1,
        name: 'Ayşe Yılmaz',
        title: 'I Loved the Product!',
        quote: 'Thanks to Sana Habits, I finally developed the habit of drinking water regularly. The app’s interface is very intuitive and the statistics are incredibly motivating!',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
        id: 2,
        name: 'Can Demir',
        title: 'Reaching My Goals is Now Easier',
        quote: 'With detailed statistics and visual progress tracking, reaching my goals has become much easier. It truly changed my life!',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        id: 3,
        name: 'Elif Kaya',
        title: 'My Source of Motivation',
        quote: 'Keeping my habit streaks and earning badges keeps me incredibly motivated. Thank you Sana Habits!',
        avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
    },
    {
        id: 4,
        name: 'Burak Tunç',
        title: 'Simple and Effective',
        quote: 'The simplest and most effective habit tracking app I’ve ever tried. Not complicated, just does the job.',
        avatar: 'https://randomuser.me/api/portraits/men/78.jpg'
    },
    {
        id: 5,
        name: 'Zeynep Akın',
        title: 'Beautiful Interface',
        quote: 'The design of the app is so beautiful that tracking my habits has become a pleasure. I definitely recommend it!',
        avatar: 'https://randomuser.me/api/portraits/women/21.jpg'
    }
];

export const Testimonials = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }} // Elemanın %30'u göründüğünde animasyonu bir kez tetikle
            className="py-16 px-4 sm:px-10 bg-gray-900 text-white"
        >
            <h2 className="text-3xl sm:text-3xl font-bold text-center text-teal-300 mb-12">
                What Our Users Say
            </h2>

            <Swiper
                // Swiper modüllerini ekle
                modules={[Autoplay, Pagination]}
                // Otomatik oynatma ayarları
                autoplay={{
                    delay: 4000, // Her yorum 4 saniye gösterilir
                    disableOnInteraction: false, // Kullanıcı etkileşiminden sonra durmasın
                    pauseOnMouseEnter: true, // Fare üzerine gelince duraksasın
                }}
                loop={true} // Yorumların sonsuz döngüde oynamasını sağlar
                spaceBetween={30} // Slaytlar arası boşluk
                slidesPerView={1} // Küçük ekranlarda tek yorum
                pagination={{ clickable: true }} // Noktalı sayfalandırma
                 // Ok butonları (ileri/geri)

                // Duyarlı ayarlar (farklı ekran boyutlarında kaç yorum gösterileceği)
                breakpoints={{
                    640: {
                        slidesPerView: 1, // Mobil küçük
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2, // Tablet
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3, // Masaüstü
                        spaceBetween: 40,
                    },
                }}
                className="  w-full mx-auto   " // Tailwind sınıfları ve özel Swiper sınıfı
            >
               


                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="bg-gray-800 p-8  rounded-xl shadow-lg border border-gray-700 flex flex-col h-full">
                                {/* Yorum Metni */}
                                <p className="text-gray-300 text-lg mb-6 flex-grow italic break-words">"{testimonial.quote}"</p>

                                {/* Kullanıcı Bilgileri */}
                                <div className="flex items-center mt-4">
                                    {testimonial.avatar && (
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-teal-400"
                                        />
                                    )}
                                    <div>
                                        <h4 className="text-xl font-semibold text-teal-400">{testimonial.name}</h4>
                                        <p className="text-gray-400 text-sm">{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                    ))}
                
            </Swiper>
        </motion.section>
    );
}