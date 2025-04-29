import { Card } from "@/components/Card";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export const ForgotPasswordForm = () => {
  const { action, isPending } = useForgotPassword();

  return (
    <Card
      header="Forgot Password"
      subHeading="Enter your email to send reset link"
    >
      <form className="space-y-6" action={action}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@doe.com"
            className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full p-2 font-semibold rounded-lg bg-black hover:bg-gray-800 text-white cursor-pointer"
        >
          {isPending ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </Card>
  );
};
