import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ email, username, password });

    setEmail("");
    setUsername("");
    setPassword("");

    navigate("/email-verify");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-sky-400 to-blue-600">
      <Card
        header="Register"
        subHeading="Create an Account"
        to="/login"
        label="Already have an account?"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              disabled={isLoading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="john.doe"
              className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="john@doe.com"
              className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mb-5 w-full p-2 font-semibold rounded-lg bg-black hover:bg-gray-800 text-white ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
