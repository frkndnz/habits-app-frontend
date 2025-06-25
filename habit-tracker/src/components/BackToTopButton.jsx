// src/components/BackToTopButton.jsx
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react'; // Yukarı ok ikonu

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  
  const toggleVisibility = () => {
    
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

 
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); 

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 p-3 bg-teal-600 text-white rounded-full shadow-lg z-50
        hover:bg-teal-700 transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="Sayfanın en üstüne git"
      title="Go Up"
    >
      <ChevronUp size={28} /> {/* Lucide ikonu */}
    </button>
  );
}