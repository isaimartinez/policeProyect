import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../auth/useAuth";

const RequireAuth = () => {

  const { auth } = useAuth();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('profile'))
  console.log("user", user)
  return (
    auth.user
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;