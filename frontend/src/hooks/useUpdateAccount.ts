import toast from "react-hot-toast";
import { useActionState, useEffect } from "react";

import { initialState } from "@/utils/constants";
import { FormState, User } from "@/utils/types/types";
import { updateAccountService } from "@/services/authService";

export const useUpdateAccount = (user: User | null) => {
  const [state, action, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData) => {
      if (!user) return { error: "User not found" };
      return await updateAccountService(formData, user);
    },
    initialState
  );

  useEffect(() => {
    if (state.success) toast.success(state.success);
    if (state.error) toast.error(state.error);
  }, [state]);

  return { action, isPending };
};
