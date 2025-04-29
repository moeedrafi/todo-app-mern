import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/contexts/AuthContext";
import { getAccessToken } from "@/utils/tokenManager";

export const PublicRoute = () => {
  const accessToken = getAccessToken();
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) return <p>LOADING....</p>;

  if (user || accessToken || isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
