import toast from "react-hot-toast";
import { useActionState, useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { initialState } from "@/utils/constants";

export const useResetPassword = () => {
  const { resetPassword } = useAuth();

  const [resetState, resetAction, isPending] = useActionState(
    resetPassword,
    initialState
  );

  useEffect(() => {
    if (resetState.success) {
      toast.success(resetState.success);
    } else if (resetState.error) {
      toast.error(resetState.error);
    }
  }, [resetState]);

  return { resetAction, isPending };
};
