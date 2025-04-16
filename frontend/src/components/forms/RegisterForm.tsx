import { Card } from "@/components/ui/Card";
import { useRegister } from "@/hooks/useRegister";

export const RegisterForm = () => {
  const {
    formRegister,
    handleSubmit,
    isSubmitting,
    errors,
    onSubmit,
    registerState,
  } = useRegister();

  return (
    <Card
      header="Register"
      subHeading="Create an Account"
      to="/login"
      label="Already have an account?"
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...formRegister("username")}
            placeholder="john.doe"
            className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
          />
          {errors.username && (
            <p className="text-rose-500">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...formRegister("email")}
            placeholder="john@doe.com"
            className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
          />
          {errors.email && (
            <p className="text-rose-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...formRegister("password")}
            placeholder="********"
            className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
          />
          {errors.password && (
            <p className="text-rose-500">{errors.password.message}</p>
          )}
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
          disabled={isSubmitting}
          className={`mb-5 w-full p-2 font-semibold rounded-lg bg-black hover:bg-gray-800 text-white ${
            isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </Card>
  );
};
