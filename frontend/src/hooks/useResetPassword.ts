import toast from "react-hot-toast";
import { useActionState, useEffect } from "react";

import { initialState } from "@/utils/constants";
import { resetPasswordAction } from "@/services/authService";

export const useResetPassword = () => {
  const [state, action, isPending] = useActionState(
    resetPasswordAction,
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
