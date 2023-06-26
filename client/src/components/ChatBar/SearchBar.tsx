import { MdSearch } from 'react-icons/md';

const SearchBar = () => {
  return (
    <div className="bg-light-shade py-3 px-5 flex items-center gap-3 h-14">
      <div className="bg-searchbar-bg flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
        <MdSearch className="text-secondary cursor-pointer text-lg" />
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="bg-transparent text-sm focus:outline-none text-primary w-full"
        />
      </div>
    </div>
  );
};

export default SearchBar;
