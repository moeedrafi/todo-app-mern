import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { UpdateAccountForm } from "@/components/forms/UpdateAccountForm";

export const DropdownMenu = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="absolute group-hover:block top-20 right-10 lg:right-40 z-10 text-black rounded-lg shadow-md">
        <ul className="p-2 bg-gray-100 text-sm flex flex-col items-start">
          <button
            onClick={logout}
            className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
          >
            Logout
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
          >
            Update Account
          </button>
        </ul>
      </div>

      {isOpen && <UpdateAccountForm />}
    </>
  );
};
