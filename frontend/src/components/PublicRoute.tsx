import { useAuth } from "@/contexts/useAuth";
import { Navigate, Outlet } from "react-router";

export const PublicRoute = () => {
  const { accessToken, isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) return <p>LOADING....</p>;

  if (user || accessToken || isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
