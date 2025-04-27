import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

export const ProtectedRoute = () => {
  const location = useLocation();
  const { accessToken, isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) return <p>LOADING....</p>;

  if (!user || !accessToken || !isLoggedIn) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return <Outlet />;
};
