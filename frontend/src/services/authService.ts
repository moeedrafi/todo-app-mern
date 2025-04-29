import API from "@/utils/api";
import { AxiosError, AxiosResponse } from "axios";

import { loginSchema, registerSchema } from "@/utils/schemas/authSchema";
import {
  Response,
  FormState,
  LoginResponse,
  RegisterResponse,
  User,
} from "@/utils/types/types";

export const createFormAction = (
  serviceFn: (formData: FormData) => Promise<FormState>
) => {
  return async (_: FormState, formData: FormData): Promise<FormState> => {
    const result = await serviceFn(formData);
    return result;
  };
};

const registerService = async (formData: FormData): Promise<FormState> => {
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

const loginService = async (formData: FormData): Promise<FormState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "All fields are required." };
  }

  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    return { error: result.error.message };
  }

  const { email: validEmail, password: validPassword } = result.data;

  try {
    const response: AxiosResponse<LoginResponse> = await API.post(
      "/api/v1/users/login",
      { email: validEmail, password: validPassword }
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

const forgotPasswordService = async (
  formData: FormData
): Promise<FormState> => {
  const email = formData.get("email") as string;
  if (!email) {
    return { error: "Email is Required" };
  }

  try {
    const response: AxiosResponse<Response> = await API.post(
      "/api/v1/users/forgot-password",
      { email }
    );

    return { success: response.data.message };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return { error: err?.response?.data?.message || "Something went wrong." };
  }
};

const resetPasswordService = async (formData: FormData): Promise<FormState> => {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!token) {
    return { error: "Token expired!" };
  }
  if (!password || !confirmPassword) {
    return { error: "Missing fields" };
  }
  if (password !== confirmPassword) {
    return { error: "Password do not match" };
  }

  try {
    const response: AxiosResponse<Response> = await API.patch(
      "/api/v1/users/reset-password",
      { password, confirmPassword, token }
    );

    return { success: response.data.message };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return { error: err?.response?.data?.message || "Something went wrong." };
  }
};

export const loginAction = createFormAction(loginService);
export const registerAction = createFormAction(registerService);
export const forgotPasswordAction = createFormAction(forgotPasswordService);
export const resetPasswordAction = createFormAction(resetPasswordService);

export const checkAuth = async () => {
  try {
    const response = await API.get("/api/v1/users/check-auth");

    return {
      success: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return { error: err?.response?.data?.message || "Something went wrong." };
  }
};

export const logoutService = async (): Promise<FormState> => {
  try {
    const response: AxiosResponse<Response> = await API.post(
      "/api/v1/users/logout"
    );

    return { success: response.data.message };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return { error: err?.response?.data?.message || "Something went wrong." };
  }
};

export const updateAccountService = async (
  formData: FormData,
  prevUser: User
): Promise<FormState> => {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const avatar = formData.get("avatar") as File;

  try {
    if (username && username !== prevUser.username) {
      await API.patch("/api/v1/users/update-account", { username });
    }

    if (avatar && avatar.size > 0) {
      const avatarFormData = new FormData();
      avatarFormData.append("avatar", avatar);
      console.log({ avatarFormData });
      await API.patch("/api/v1/users/update-avatar", avatarFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    if (email && email !== prevUser.email) {
      await API.patch("/api/v1/users/request-email-change", { email });
      return { success: "Check your inbox to verify your new email." };
    }

    return { success: "Account updated successfully." };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return { error: err?.response?.data?.message || "Something went wrong." };
  }
};

export const verifyEmail = async (token: string): Promise<FormState> => {
  if (!token) return { error: "Token is Expired" };

  try {
    const response = await API.post("/api/v1/users/verify-email", { token });

    return { success: response.data.message };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return { error: err?.response?.data?.message || "Something went wrong." };
  }
};
