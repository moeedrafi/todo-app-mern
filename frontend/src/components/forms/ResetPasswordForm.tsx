import { useSearchParams } from "react-router";

import { Card } from "@/components/ui/Card";
import { useResetPassword } from "@/hooks/useResetPassword";

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") as string;

  const { isPending, resetAction } = useResetPassword();

  return (
    <Card header="Reset Password" subHeading="Enter your new password">
      <form
        className="space-y-6"
        action={(formData) => {
          formData.append("token", token);
          resetAction(formData);
        }}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="********"
            className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            placeholder="********"
            className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full p-2 font-semibold rounded-lg bg-black hover:bg-gray-800 text-white cursor-pointer"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </Card>
  );
};
