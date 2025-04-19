import { Card } from "@/components/ui/Card";

export const ResetPasswordForm = () => {
  return (
    <Card header="Reset Password" subHeading="Enter your new password">
      <form className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="********"
            className={`px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black`}
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 font-semibold rounded-lg bg-black hover:bg-gray-800 text-white cursor-pointer"
        >
          Reset Password
        </button>
      </form>
    </Card>
  );
};
