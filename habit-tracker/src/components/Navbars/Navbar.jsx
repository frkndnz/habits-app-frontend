import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    
    const location = useLocation();

    return (
        <>
            <div>
                <Link to="/" className="mr-4">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <p className="text-xl font-bold">Habits App</p>
            </div>
            <div >
                <UserMenu /> 
            </div>
        </>
    );                                                                                                                                                                                                           
};

export default Navbar;                          