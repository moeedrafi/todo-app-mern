export const SearchInput = () => {
  return (
    <div className="flex items-center justify-center mb-10">
      <input
        type="text"
        placeholder="todos...."
        className="w-2/4 px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
      />
    </div>
  );
};
