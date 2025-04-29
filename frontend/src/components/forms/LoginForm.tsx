import { Link } from "react-router";

import { Card } from "@/components/Card";
import { useLogin } from "@/hooks/useLogin";

export const LoginForm = () => {
  const { isPending, action } = useLogin();

  return (
    <Card
      header="Login"
      subHeading="Welcome Back"
      to="/register"
      label="Don't have an account?"
    >
      <form action={action} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="john@doe.com"
            className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
          />
        </div>

        <div className="text-end">
          <Link
            to="/forgot-password"
            className="text-sm hover:underline underline-offset-2"
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mb-5 w-full p-2 font-semibold rounded-lg bg-black hover:bg-gray-800 text-white cursor-pointer"
        >
          Submit
        </button>
      </form>
    </Card>
  );
};
