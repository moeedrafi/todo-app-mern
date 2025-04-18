import { useState } from "react";
import { Link } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/navbar/Avatar";
import { DropdownMenu } from "@/components/navbar/DropdownMenu";

export const Navbar = () => {
  const { user, isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="h-32 py-8 px-8 md:px-16 lg:px-32 xl:px-64">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Todoist</h1>

          {user && isLoggedIn ? (
            <Avatar
              avatar={user.avatar}
              fallbackAvatar={user.username}
              toggleOpen={() => setIsOpen((prev) => !prev)}
            />
          ) : (
            <Link
              to="/login"
              className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {isOpen && <DropdownMenu />}
    </>
  );
};
