import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "@/contexts/AuthContext";
import { getAccessToken } from "@/utils/tokenManager";

export const ProtectedRoute = () => {
  const location = useLocation();
  const accessToken = getAccessToken();
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) return <p>LOADING....</p>;

  if (!user || !accessToken || !isLoggedIn) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return <Outlet />;
};
