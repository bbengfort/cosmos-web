import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { isLoggedIn  } from "../context/AuthProvider";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const isAllowed = () => {
    return isLoggedIn(auth) && allowedRoles?.includes(auth?.claims?.role)
  }

  return (
    isAllowed()
      ? <Outlet />
      : isLoggedIn(auth)
        ? <Navigate to="/not-allowed" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;