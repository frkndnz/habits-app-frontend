import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Link, useLocation } from "react-router-dom";

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
        <div ref={menuRef} className="relative inline-block ">

            <button className="flex items-center space-x-1 hover:opacity-80 transition w-40 justify-center cursor-pointer"
                onClick={() => setOpen(prev => !prev)}
            >
                <span className="font-medium">{user && isAuthenticated ? user.user_name : "Welcome Guest"}</span>
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isOpen &&(
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg  ">
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