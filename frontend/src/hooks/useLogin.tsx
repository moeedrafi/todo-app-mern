import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { useActionState, useEffect } from "react";

import { useAuth } from "@/contexts/useAuth";
import { initialState } from "@/utils/constants";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginState, loginAction, isPending] = useActionState(
    login,
    initialState
  );

  useEffect(() => {
    if (loginState.success) {
      toast.success(loginState.success);
      navigate(location.state?.path || "/", { replace: true });
    }
  }, [navigate, loginState, location]);

  return { loginAction, isPending, loginState };
};
