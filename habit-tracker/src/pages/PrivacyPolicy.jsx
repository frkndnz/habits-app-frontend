import React from "react";

export const  PrivacyPolicy=()=> {
  return (
    <div className="w-full mx-auto p-6 text-white   ">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-sm text-muted-foreground">
        Last updated: June 26, 2025
      </p>

      <p className="mb-4">
        Welcome to HabitFlux. Your privacy is important to us. This Privacy
        Policy explains how we collect, use, and protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className=" pl-6 mb-4">
        <li>Email address (for login, notifications)</li>
        <li>Usage data (e.g., completed habits, statistics)</li>
        <li>Google OAuth profile (only email & name)</li>
        <li>Cookies for session management</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
      <ul className=" pl-6 mb-4">
        <li>To manage your account and preferences</li>
        <li>To send occasional habit-related notifications</li>
        <li>To improve application performance and UX</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
      <p className="mb-4">
        We do not sell or share your personal data with third parties, except:
      </p>
        <ul className=" pl-6">
          <li>Legal obligations (if requested by authorities)</li>
          <li>Third-party auth providers (e.g., Google OAuth)</li>
        </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
      <ul className=" pl-6 mb-4">
        <li>You can request your data at any time</li>
        <li>You can request deletion of your account</li>
        <li>You may opt out of notifications</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact</h2>
      <p className="mb-4">
        If you have any questions, contact us at:
        <br />
        <a className="text-teal-600 underline" href="mailto:privacy@habitflux.app">
          habitfluxapp@gmail.com
        </a>
      </p>

      <p className="text-sm text-muted-foreground">
        By using HabitFlux, you agree to this policy.
      </p>
    </div>
  );
}
