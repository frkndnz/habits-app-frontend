// src/pages/admin/Layout.jsx
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react"; // `lucide-react` yüklemediysen: npm i lucide-react
import { Header } from "../../components/admin/Header";
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed z-40 lg:static lg:translate-x-0 transform top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={36} />
          </button>
        </div>
        <nav className="space-y-2">
          <Link to="/admin" className="block hover:text-gray-300">Dashboard</Link>
          <Link to="/admin/users" className="block hover:text-gray-300">Users</Link>
          <Link to="/admin/blogs" className="block hover:text-gray-300">Blogs</Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header setSideBar={()=>setSidebarOpen(true)}/>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
