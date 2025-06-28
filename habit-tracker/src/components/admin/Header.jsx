import { Menu, X } from "lucide-react";
import { UserDropdown } from "./UserDropdown";





export const Header = ({ mobileMenuOpen, toggleMobileMenu }) => {
    return (


        <header className=" flex items-center justify-between bg-gradient-to-r from-gray-800 to-teal-500   text-white px-4 py-3 border-b">
            {/* Hamburger button (mobile only) */}
            <button
                onClick={toggleMobileMenu}
                className="lg:hidden text-gray-600"
                aria-label="Toggle menu"
            >
                <Menu size={24} />
            </button>

            <h1 className="text-xl mx-auto font-semibold">Admin Dashboard</h1>

            <UserDropdown />
        </header>

    );
};

