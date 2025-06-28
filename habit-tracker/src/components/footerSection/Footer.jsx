import React from 'react';
import { FaGithub as GitHub, FaLinkedin as Linkedin, FaEnvelope as Mail } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-10 mt-10 border-t border-gray-700">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-12 text-center sm:text-left">
                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                    <Link to="/about" className="hover:text-white transition">About</Link>
                    <Link to="/contact" className="hover:text-white transition">Contact</Link>
                    <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
                </div>

                {/* Social Icons */}
                <div className="flex gap-5 justify-center">
                    <a href="https://github.com/frkndnz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        <GitHub size={20} />
                    </a>
                    <a href="https://linkedin.com/in/furkandenizz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        <Linkedin size={20} />
                    </a>
                    <a href="mailto:deniz.furkann@outlook.com" className="hover:text-white transition">
                        <Mail size={20} />
                    </a>
                </div>
            </div>

            {/* Divider */}
            <div className=" border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} <span className="text-white font-semibold">HabitFlux</span>. All rights reserved.</p>
                <p className="mt-1">Built with ❤️ by <span className="text-white font-medium">Furkan Deniz</span></p>
            </div>
        </footer>

    );
}