import { useSelector } from "react-redux";
import { Navigate ,Outlet} from "react-router-dom";

const RequireAuthAdmin = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const role=useSelector((state)=>state.auth.user?.user_role);
  if (isAuth && role==="Admin"){
    return <Outlet/>;
  }
  else{
    return <Navigate to="/auth/login" replace />;
  }
  
};

export default RequireAuthAdmin;
