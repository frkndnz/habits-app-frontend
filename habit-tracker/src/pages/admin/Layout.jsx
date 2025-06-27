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
      <div className="hidden lg:block lg:w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin" className="block hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/admin/users" className="block hover:text-gray-300">
            Users
          </Link>
          <Link to="/admin/blogs" className="block hover:text-gray-300">
            Blogs
          </Link>
          <Link to="/admin/feedbacks" className="block hover:text-gray-300">
            Feedbacks
          </Link>
          <Link to="/" className="block hover:text-gray-300">
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
