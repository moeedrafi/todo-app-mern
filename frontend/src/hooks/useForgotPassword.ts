import toast from "react-hot-toast";
import { useActionState, useEffect } from "react";

import { initialState } from "@/utils/constants";
import { forgotPasswordAction } from "@/services/authService";

export const useForgotPassword = () => {
  const [state, action, isPending] = useActionState(
    forgotPasswordAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return { action, isPending };
};
