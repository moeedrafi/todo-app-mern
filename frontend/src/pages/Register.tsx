import { useActionState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { FormState } from "@/utils/types";

const initialState: FormState = {};

const Register = () => {
  const { register } = useAuth();

  const [registerState, registerAction, isPending] = useActionState(
    register,
    initialState
  );

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-sky-400 to-blue-600">
      <Card
        header="Register"
        subHeading="Create an Account"
        to="/login"
        label="Already have an account?"
      >
        <form className="space-y-6" action={registerAction}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              disabled={isPending}
              placeholder="john.doe"
              className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black ${
                isPending && "cursor-not-allowed"
              }`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              disabled={isPending}
              type="email"
              placeholder="john@doe.com"
              className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black ${
                isPending && "cursor-not-allowed"
              }`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              disabled={isPending}
              type="password"
              placeholder="********"
              className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black ${
                isPending && "cursor-not-allowed"
              }`}
            />
          </div>

          {registerState.error && (
            <p className="p-2 rounded-lg bg-red-200 text-red-500">
              {registerState.error}
            </p>
          )}
          {registerState.success && (
            <p className="p-2 rounded-lg bg-green-200 text-green-500">
              {registerState.success}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`mb-5 w-full p-2 font-semibold rounded-lg bg-black hover:bg-gray-800 text-white ${
              isPending ? "cursor-not-allowed" : "cursor-pointer"
            } ${isPending && "opacity-70"}`}
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
