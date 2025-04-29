import { useState } from "react";

import { useLogout } from "@/hooks/useLogout";
import { UpdateAccountForm } from "@/components/forms/UpdateAccountForm";

export const DropdownMenu = () => {
  const { action, isPending } = useLogout();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="absolute group-hover:block top-20 right-10 lg:right-40 z-10 text-black rounded-lg shadow-md">
        <ul className="p-2 bg-gray-100 text-sm flex flex-col items-start">
          <form action={action}>
            <button
              disabled={isPending}
              className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
            >
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </form>

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
