import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="bg-black text-white h-screen w-screen flex items-center justify-center">
      <div className="bg-[#020024] p-4 rounded-lg w-2/4">
        <h1 className="text-2xl font-semibold tracking-wider mb-5 text-center">
          Sign In
        </h1>

        <div className="flex flex-col gap-3 mb-3">
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
        </div>

        <div className="flex flex-col gap-5">
          <Button variant="link" className="self-end">
            <Link to="/register" className="text-white text-xs">
              Forgot your password?
            </Link>
          </Button>

          <Button
            variant="secondary"
            className="bg-[#3a31d8] text-white hover:bg-[#0600c2] cursor-pointer"
          >
            Sign In
          </Button>

          <Button variant="link">
            <Link to="/register" className="text-white text-center text-xs">
              Create an Account
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
