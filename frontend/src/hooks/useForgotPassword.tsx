import toast from "react-hot-toast";
import { useActionState, useEffect } from "react";

import { useAuth } from "@/contexts/useAuth";
import { initialState } from "@/utils/constants";

export const useForgotPassword = () => {
  const { forgotPassword } = useAuth();

  const [forgotState, forgotAction, isPending] = useActionState(
    forgotPassword,
    initialState
  );

  useEffect(() => {
    if (forgotState.success) {
      toast.success(forgotState.success);
    } else if (forgotState.error) {
      toast.error(forgotState.error);
    }
  }, [forgotState]);

  return { forgotAction, isPending };
};
