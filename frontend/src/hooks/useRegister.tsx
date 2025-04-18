import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { startTransition, useActionState, useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { initialState } from "@/utils/constants";
import { RegisterSchemaType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/schemas/authSchema";
import toast from "react-hot-toast";

export const useRegister = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const [registerState, registerAction] = useActionState(
    register,
    initialState
  );

  const onSubmit = (data: RegisterSchemaType) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);

    startTransition(() => {
      registerAction(formData);
    });
  };

  useEffect(() => {
    if (registerState?.success) {
      toast.success(registerState.success);
      navigate("/email-verify");
    }
  }, [registerState, navigate]);

  return {
    formRegister,
    handleSubmit,
    isSubmitting,
    errors,
    registerState,
    onSubmit,
  };
};
