import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useActionState, useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { initialState } from "@/utils/constants";

export const useUpdateAccount = () => {
  const navigate = useNavigate();
  const { updateAccount } = useAuth();

  const [updateState, updateAction, isPending] = useActionState(
    updateAccount,
    initialState
  );

  useEffect(() => {
    if (updateState.success) {
      toast.success(updateState.success);
      navigate("/");
    } else if (updateState.error) {
      toast.error(updateState.error);
    }
  }, [navigate, updateState]);

  return { updateAction, isPending };
};
