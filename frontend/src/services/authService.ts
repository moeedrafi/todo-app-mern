import { AxiosError, AxiosResponse } from "axios";

import API from "@/utils/api";
import { registerSchema } from "@/utils/schemas/authSchema";
import { RegisterFormState, RegisterResponse } from "@/utils/types/types";

export const registerService = async (
  formData: FormData
): Promise<RegisterFormState> => {
  const email = formData.get("email") as string | null;
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !username || !password) {
    return { error: "All fields are required." };
  }

  const result = registerSchema.safeParse({ email, username, password });
  if (!result.success) {
    return { error: result.error.message };
  }

  const {
    email: validEmail,
    password: validPassword,
    username: validUsername,
  } = result.data;

  try {
    const response: AxiosResponse<RegisterResponse> = await API.post(
      "/api/v1/users/register",
      { email: validEmail, password: validPassword, username: validUsername }
    );

    return { success: response.data.message, user: response.data.data };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return {
      error:
        err?.response?.data?.message ||
        "Something went wrong during Registering",
    };
  }
};
