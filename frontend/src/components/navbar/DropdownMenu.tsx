export const DropdownMenu = () => {
  return (
    <div className="absolute group-hover:block top-20 right-10 z-10 text-black rounded-lg shadow-md">
      <ul className="p-2 bg-gray-100 text-sm">
        <button className="py-1 px-2 hover:bg-gray-200 pr-10 cursor-pointer">
          Logout
        </button>
      </ul>
    </div>
  );
};
