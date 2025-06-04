import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return isAuth ? children : <Navigate to="/auth/login" replace />;
};

export default RequireAuth;
