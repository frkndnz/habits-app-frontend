import React from 'react';
import {FaGithub as GitHub, FaLinkedin as Linkedin, FaEnvelope as Mail} from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-10 mt-10 border-t border-gray-700">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
                <div>
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Habit Tracker</span>
                    </p>
                    <p className="text-xs mt-1">Built with ❤️ by <span className="text-white font-medium">Furkan Deniz</span></p>
                </div>

                <div className="flex gap-4 justify-center sm:justify-end">
                    <a href="https://github.com/frkndnz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        <GitHub size={18} />
                    </a>
                    <a href="https://linkedin.com/in/furkandenizz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        <Linkedin size={18} />
                    </a>
                    <a href="mailto:furkan@example.com" className="hover:text-white transition">
                        <Mail size={18} />
                    </a>
                </div>
            </div>
        </footer>

    );
}