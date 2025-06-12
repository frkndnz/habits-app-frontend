import { Menu, X } from "lucide-react";
import { UserDropdown } from "./UserDropdown";





export const Header = ({setSideBar}) => {
    return (
        <header className="flex items-center justify-between bg-white px-4 py-3 border-b">
            <button onClick={setSideBar} className="lg:hidden text-gray-600">
                <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <UserDropdown/>
        </header>
    );
};

