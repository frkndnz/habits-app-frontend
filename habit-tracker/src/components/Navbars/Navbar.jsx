import { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center relative">
        {/* Mobil Hamburger */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sol Menü */}
        <div className="hidden sm:flex gap-6 items-center">
          <Link to="/" className="hover:underline font-medium">Home</Link>
          {isAuthenticated && (

            <Link to="/dashboard" className="hover:underline font-medium">Dashboard</Link>
          )}
            
          
        </div>

        {/* Orta Başlık */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <p className="text-lg sm:text-xl font-bold text-white">Habits App</p>
        </div>

        {/* Sağ Menü */}
        <div className="flex items-center">
          <UserMenu />
        </div>
      </div>

      {/* Mobil Menü Açıldığında */}
      {menuOpen && (
        <div className="flex flex-col gap-2 mt-3 sm:hidden">
          <Link to="/" className="hover:underline font-medium">Home</Link>
          <Link to="/dashboard" className="hover:underline font-medium">Dashboard</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
