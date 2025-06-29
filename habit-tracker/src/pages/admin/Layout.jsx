// src/pages/admin/Layout.jsx
import { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react"; // `lucide-react` yüklemediysen: npm i lucide-react
import { Header } from "../../components/admin/Header";
export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div class="hidden lg:block lg:w-64 bg-gray-800 text-white p-6 rounded-xs shadow-xl">
  <h2 class="text-2xl font-extrabold mb-8 text-center tracking-wide">Admin Panel</h2>
  <nav class="space-y-3">
    <Link to="/admin" class="block py-2 px-4 rounded-md text-lg font-medium hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
      Dashboard
    </Link>
    <Link to="/admin/users" class="block py-2 px-4 rounded-md text-lg font-medium hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
      Users
    </Link>
    <Link to="/admin/blogs" class="block py-2 px-4 rounded-md text-lg font-medium hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
      Blogs
    </Link>
    <Link to="/admin/feedbacks" class="block py-2 px-4 rounded-md text-lg font-medium hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
      Feedbacks
    </Link>
    <Link to="/admin/logs" class="block py-2 px-4 rounded-md text-lg font-medium hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
      Logs
    </Link>
    <div class="border-t border-gray-700 my-4"></div>
    <Link to="/" class="block py-2 px-4 rounded-md text-lg font-medium hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
      Home
    </Link>
  </nav>
</div>

      {/* Content area */}
      <div className=" flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="relative">


          <Header
            mobileMenuOpen={mobileMenuOpen}
            toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <nav
              ref={menuRef}
              className="lg:hidden absolute top-full left-0 w-fit bg-white shadow border-b px-4 py-3 flex flex-col space-y-3 z-50"
            >
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-teal-600"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/users"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-teal-600"
              >
                Users
              </Link>
              <Link
                to="/admin/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-teal-600"
              >
                Blogs
              </Link>
              <Link
                to="/admin/feedbacks"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-teal-600"
              >
                Feedbacks
              </Link>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-teal-600"
              >
                Home
              </Link>
            </nav>
          )}
        </div>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
