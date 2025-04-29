import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { useActionState, useEffect } from "react";

import { initialState } from "@/utils/constants";
import { registerAction } from "@/services/authService";

export const useRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, action, isPending] = useActionState(
    registerAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      navigate(location.state?.path || "/", { replace: true });
    }
  }, [state, navigate, location]);

  return { isPending, action };
};
