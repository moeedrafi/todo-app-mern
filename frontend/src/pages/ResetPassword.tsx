import { Card } from "@/components/ui/Card";
import { useResetPassword } from "@/hooks/useResetPassword";

const ResetPassword = () => {
  const { forgotAction, isPending } = useResetPassword();

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-sky-400 to-blue-600">
      <Card
        header="Reset Password"
        subHeading="Enter your email to send reset link"
      >
        <form className="space-y-6" action={forgotAction}>
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

      {/* <Card
        header="Reset Password"
        subHeading="Enter new password for your account"
      >
        <form className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 font-semibold rounded-lg bg-black hover:bg-gray-800 text-white cursor-pointer"
          >
            Reset
          </button>
        </form>
      </Card> */}
    </div>
  );
};

export default ResetPassword;
