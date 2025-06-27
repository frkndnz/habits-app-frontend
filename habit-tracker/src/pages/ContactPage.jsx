import React from "react";
import { FaGithub as Git, FaLinkedin as Linkedin, FaEnvelope as Mail } from 'react-icons/fa';

export const  ContactPage=()=> {
  return (
    <div className="max-w-2xl mx-auto p-6 text-gray-800 bg-gray-200 mt-4 rounded-xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="mb-4">
        Have questions, suggestions, or feedback? We'd love to hear from you.
        You can reach us anytime via email or connect through social platforms.
      </p>

      <div className="space-y-4 mt-6">
        <div className="flex items-center gap-3">
          <Mail className="text-teal-600 w-5 h-5" />
          <a
            href="mailto:habitfluxapp@gmail.com"
            className="text-teal-600 underline"
          >
            habitfluxapp@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Git className="text-gray-700 w-5 h-5" />
          <a
            href="https://github.com/frkndnz/habits-app-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            GitHub Repository
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Linkedin className="text-blue-600 w-5 h-5" />
          <a
            href="https://www.linkedin.com/in/furkandenizz/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Furkan Deniz on LinkedIn
          </a>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-8">
        We typically respond within 24–48 hours.
      </p>
    </div>
  );
}
