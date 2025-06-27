import React from "react";

export const AboutPage=()=> {
  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">About HabitFlux</h1>

      <p className="mb-4">
        HabitFlux is a modern habit tracking and productivity platform designed
        to help you build better routines, stay accountable, and reach your goals.
        Whether you want to drink more water, exercise regularly, or read every day,
        HabitFlux gives you the tools to stay consistent and motivated.
      </p>

      <h2 className="text-xl font-semibold mb-2 mt-6">Why We Built HabitFlux</h2>
      <p className="mb-4">
        We believe that small habits can lead to big changes. Our goal is to provide
        a clean, distraction-free interface where users can focus on their growth
        and track their progress over time — without feeling overwhelmed.
      </p>

      <h2 className="text-xl font-semibold mb-2 mt-6">Who We Are</h2>
      <p className="mb-4">
        This app was crafted with care by Furkan Deniz using modern technologies such as
        React, Tailwind CSS, and .NET 9 — following Clean Architecture and CQRS patterns.
        It’s an open project that continuously evolves based on user feedback and real-world needs.
      </p>

      <h2 className="text-xl font-semibold mb-2 mt-6">What’s Next</h2>
      <ul className=" pl-6 mb-6">
        <li>Mobile-first improvements</li>
        <li>Dark mode and multi-language support</li>
        <li>Pomodoro & blog modules</li>
        <li>Community features and habit sharing</li>
      </ul>

      <p className="text-sm text-teal-300">
        Thank you for being part of HabitFlux. Let's grow better, together.
      </p>
    </div>
  );
}
