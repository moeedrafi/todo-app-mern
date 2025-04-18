import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useActionState, useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { initialState } from "@/utils/constants";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginState, loginAction, isPending] = useActionState(
    login,
    initialState
  );

  useEffect(() => {
    if (loginState.success) {
      toast.success(loginState.success);
      navigate("/");
    }
  }, [navigate, loginState]);

  return { loginAction, isPending, loginState };
};
