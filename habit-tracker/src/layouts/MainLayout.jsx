import React, { useState,useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbars/Navbar";
import { Footer } from "../components/footerSection/Footer";
import BackToTopButton from "../components/BackToTopButton";
import GeminiChat from "../components/GeminiChat";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";

const MainLayout = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Ekran genişliğini kontrol eden fonksiyon
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // 768px'i mobil sınır olarak kabul ettik (Tailwind'in 'md' breakpoint'i gibi)
        };

        // Komponent yüklendiğinde ve pencere boyutu değiştiğinde kontrol et
        checkScreenSize(); // İlk yüklemede çalıştır
        window.addEventListener('resize', checkScreenSize); // Yeniden boyutlandırmada dinle

        // Komponent kaldırıldığında event listener'ı temizle
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    
    return (
        <div className="min-h-screen w-full  max-w-[100vw]  flex flex-col gap-4 px-2 sm:px-4 bg-gray-900">
            <nav className="bg-gradient-to-r from-gray-900 to-gray-600 text-white  px-4 py-3 flex justify-between items-center rounded-lg shadow-md  mt-4">
                <Navbar />
            </nav>
            <main className="">
                <Outlet />
            </main>
            <Footer />

            <BackToTopButton />
            {isAuthenticated && <GeminiChat />}
            <Toaster
                position={isMobile ? "bottom-center" : "top-right"}
                richColors
                closeButton
            />
        </div>
    );
};

export default MainLayout;
