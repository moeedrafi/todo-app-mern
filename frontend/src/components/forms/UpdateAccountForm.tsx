import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/Card";
import { useUpdateAccount } from "@/hooks/useUpdateAccount";

export const UpdateAccountForm = () => {
  const { user } = useAuth();
  const { isPending, updateAction } = useUpdateAccount();

  if (!user) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-20 bg-black/75">
      <Card header="Update Account" subHeading="update your account">
        <form action={updateAction} className="space-y-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder={user.username}
              className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={user.email}
              className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
            />
          </div>

          <div className="flex flex-col gap-4 my-4">
            <label htmlFor="avatar">Avatar</label>
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={
                  user.avatar ||
                  "https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=1016&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt=""
                width={48}
                height={48}
                className="w-12 h-12 rounded-md object-cover"
              />
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="px-2 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
              />
            </div>
          </div>

          <Link
            to="/reset-password"
            className="text-sm hover:underline underline-offset-2"
          >
            Change password?
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className={`mt-5 w-full p-2 font-semibold rounded-lg hover:bg-gray-800 text-white cursor-pointer ${
              isPending ? "bg-black/75" : "bg-black"
            }`}
          >
            {isPending ? "Updating..." : "Update Account"}
          </button>
        </form>
      </Card>
    </div>
  );
};
