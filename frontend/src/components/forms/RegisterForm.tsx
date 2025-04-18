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
            id="username"
            type="text"
            {...formRegister("username")}
            placeholder="john.doe"
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "username-error" : undefined}
            className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
          />
          {errors.username && (
            <p
              id="username-error"
              role="alert"
              aria-live="polite"
              className="text-rose-500"
            >
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...formRegister("email")}
            placeholder="john@doe.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
          />
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              aria-live="polite"
              className="text-rose-500"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            {...formRegister("password")}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
          />
          {errors.password && (
            <p
              id="password-error"
              role="alert"
              aria-live="polite"
              className="text-rose-500"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {registerState.error && (
          <p
            role="alert"
            aria-live="assertive"
            className="p-2 rounded-lg bg-red-200 text-red-500"
            tabIndex={-1}
          >
            {registerState.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
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
