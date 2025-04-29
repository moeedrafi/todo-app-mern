import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useActionState, useEffect } from "react";

import { initialState } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import { setAccessToken } from "@/utils/tokenManager";
import { logoutService } from "@/services/authService";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useAuth();
  const [state, action, isPending] = useActionState(
    logoutService,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      setUser(null);
      setAccessToken(null);
      setIsLoggedIn(false);
      toast.success(state.success);

      navigate("/login");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, setUser, setIsLoggedIn, navigate]);

  return { action, isPending };
};
