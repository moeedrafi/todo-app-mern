import axios from "axios";

async function registerUserAction(
  prevState: { success: boolean; error: boolean; message: string; user: any },
  payload: { formData: FormData }
) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/register",
      payload.formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return {
      user: response.data.data,
      success: true,
      error: false,
      message: response.data.message,
    };
  } catch (err: any) {
    return {
      user: null,
      success: false,
      error: true,
      message: err.response?.data?.message || "Registration failed!",
    };
  }
}

export { registerUserAction };
