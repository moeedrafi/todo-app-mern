import { Link, useNavigate } from "react-router";
import { useActionState, useState } from "react";

import { registerUserAction } from "@/utils";
import { Button } from "@/components/ui/button";

const Register = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [state, registerUser, isPending] = useActionState(registerUserAction, {
    user: null,
    success: false,
    message: "",
    error: false,
  });

  const formAction = (formData: FormData) => {
    registerUser({ formData });
    navigate("/");
  };

  console.log(state.user);

  return (
    <div className="bg-black text-white h-screen w-screen flex items-center justify-center">
      <div className="bg-[#020024] p-4 rounded-lg w-2/4">
        <h1 className="text-2xl font-semibold tracking-wider mb-5 text-center">
          Sign Up
        </h1>

        <form action={formAction} className="flex flex-col gap-3 mb-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              className="p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="john.doe"
              className="p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              className="p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              className="p-2 rounded-lg"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setAvatar(e.target.files[0]);
                }
              }}
            />
          </div>

          <Button
            type="submit"
            variant="secondary"
            disabled={isPending}
            className="bg-[#3a31d8] text-white hover:bg-[#0600c2] cursor-pointer"
          >
            {isPending ? "Registring" : "Sign Up"}
          </Button>

          {state.error && <p className="text-red-500">Registration Failed</p>}
          {state.success && (
            <p className="text-green-500">User Registered Successfully</p>
          )}
        </form>

        <div className="flex justify-center">
          <Button variant="link">
            <Link to="/register" className="text-white text-xs">
              Already have an Account?
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
