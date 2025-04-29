import toast from "react-hot-toast";
import { useActionState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { initialState } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import { loginAction } from "@/services/authService";

export const useLogin = () => {
  const { setUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.success && state.user) {
      setUser(state.user);
      setIsLoggedIn(true);

      toast.success(state.success);
      navigate(location.state?.path || "/", { replace: true });
    } else if (state.error) {
      toast.success(state.error);
    }
  }, [navigate, state, location, setUser, setIsLoggedIn]);

  return { action, isPending };
};
