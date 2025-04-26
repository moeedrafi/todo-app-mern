import toast from "react-hot-toast";
import { useActionState, useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { initialState } from "@/utils/constants";

export const useUpdateAccount = () => {
  const { updateAccount } = useAuth();

  const [updateState, updateAction, isPending] = useActionState(
    updateAccount,
    initialState
  );

  useEffect(() => {
    if (updateState.success) {
      toast.success(updateState.success);
    } else if (updateState.error) {
      toast.error(updateState.error);
    }
  }, [updateState]);

  return { updateAction, isPending };
};
