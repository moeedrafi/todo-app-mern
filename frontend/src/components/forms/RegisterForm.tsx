import { Card } from "@/components/Card";
import { useRegister } from "@/hooks/useRegister";

export const RegisterForm = () => {
  const { action, isPending } = useRegister();

  return (
    <Card
      header="Register"
      subHeading="Create an Account"
      to="/login"
      label="Already have an account?"
    >
      <form className="space-y-6" action={action}>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="john.doe"
            // aria-invalid={!!errors.username}
            // aria-describedby={errors.username ? "username-error" : undefined}
            className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="john@doe.com"
            // aria-invalid={!!errors.email}
            // aria-describedby={errors.email ? "email-error" : undefined}
            className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            // aria-invalid={!!errors.password}
            // aria-describedby={errors.password ? "password-error" : undefined}
            className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className={`mb-5 w-full p-2 font-semibold rounded-lg bg-black hover:bg-gray-800 text-white ${
            isPending ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </Card>
  );
};
