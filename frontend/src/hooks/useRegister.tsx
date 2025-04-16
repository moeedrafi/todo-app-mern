import { useActionState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/hooks/useAuth";
import { initialState } from "@/utils/constants";
import { RegisterSchemaType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/schemas/authSchema";

export const useRegister = () => {
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

  const onSubmit = async (data: RegisterSchemaType) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);

    await registerAction(formData);
  };

  return {
    formRegister,
    handleSubmit,
    isSubmitting,
    errors,
    registerState,
    onSubmit,
  };
};
