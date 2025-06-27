import React from 'react';
import { FaGithub as GitHub, FaLinkedin as Linkedin, FaEnvelope as Mail } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-10 mt-10 border-t border-gray-700">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-40 text-center sm:text-left mb-12 mt-2 ">
                <div className='grid grid-cols-1 sm:grid-cols-4 gap-4  justify-center w-fit'>
                    <Link to="/about" className=" text-sm underline mx-2">About</Link>
                    <Link to="/contact" className="text-sm underline mx-2">Contact</Link>
                    <Link to="/privacy-policy" className="text-sm underline mx-2">Privacy Policy</Link>
                    

                </div>
                <div className="flex gap-4 justify-center sm:justify-end">
                    <a href="https://github.com/frkndnz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        <GitHub size={20} />
                    </a>
                    <a href="https://linkedin.com/in/furkandenizz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        <Linkedin size={20} />
                    </a>
                    <a href="mailto:furkan@example.com" className="hover:text-white transition">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
                <div className='w-fit mx-auto mt-6'>
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Habit Tracker</span>
                    </p>
                    <p className="text-xs mt-1">Built with ❤️ by <span className="text-white font-medium">Furkan Deniz</span></p>
                </div>
        </footer>

    );
}