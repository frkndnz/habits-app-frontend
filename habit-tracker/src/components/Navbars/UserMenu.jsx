import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";
const UserMenu = () => {
    const [isOpen, setOpen] = useState(false);
    const dispatch = useDispatch();

    const location = useLocation();
   
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
       
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setOpen(false);
    },[location]);



    const handleLogout = () => {
        setOpen(false);
        dispatch(logout());
    }

    return (
        <div ref={menuRef} className="relative inline-block text-sm sm:text-base ">

            <button className="flex items-center justify-between w-18 sm:w-30 px-3 py-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-all duration-150"
                onClick={() => setOpen(prev => !prev)}
            >
                <User className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
                <svg
                    className="w-4 h-4 m2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isOpen &&(
                <div className="absolute right-0 mt-2 w-18 sm:w-30 bg-white text-black rounded-lg shadow-lg  z-50 ">
                    <ul className="py-2">
                        {user && isAuthenticated ? (
                            <>
                                <li className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer" ><Link className="block w-full " to="/user/profile">Profile</Link></li>
                                <li className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"><Link className="block w-full " to="/settings">Settings</Link></li>
                                <li className="px-4 py-2 text-red-600 hover:bg-red-100 hover:text-red-800 cursor-pointer" onClick={handleLogout}>Logout</li>
                            </>
                        ) : (
                            <>
                                <li className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"><Link className="block w-full " to="/auth/login">Login</Link></li>
                                <li className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"><Link className="block w-full " to="/auth/register">Register</Link></li>
                            </>
                        )}

                    </ul>

                </div>
            )}
        </div>
    )
};

export default UserMenu;