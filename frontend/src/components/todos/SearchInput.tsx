export const SearchInput = () => {
  return (
    <form className="flex items-center justify-center gap-4 mb-10">
      <label htmlFor="desc" className="sr-only">
        Search Todos
      </label>
      <input
        id="desc"
        name="desc"
        type="text"
        placeholder="write todos...."
        className="w-2/4 px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
      />
      <select name="priority">
        <option value="">Choose Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button className="px-3 py-2 bg-black rounded-lg text-white">Add</button>
    </form>
  );
};
