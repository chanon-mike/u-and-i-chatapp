import { BiSearch } from 'react-icons/bi';
const SearchBar = () => {
  return (
    <div className="bg-rich-black py-3 px-5 flex items-center gap-3 h-14">
      <div className="bg-panel-header-bg flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
        <BiSearch className="text-panel-header-icon cursor-pointer text-lg" />
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="bg-transparent text-sm focus:outline-none text-white w-full"
        />
      </div>
    </div>
  );
};

export default SearchBar;
