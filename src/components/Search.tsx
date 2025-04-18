import { useState } from "react";
// Icons
import searchicon from "/assets/icons/search.svg";
// Utils
import { useTheme } from "../utils/Theme";

export const Search = ({
  placeholder,
  onSearchChange,
}: {
  placeholder: string;
  onSearchChange: (searchTerm: string) => void;
}) => {
  const [search, setSearch] = useState("");
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.replace(
      /[^a-zA-Z0-9šŠčČćĆđĐžŽ \-]/g,
      ""
    );
    setSearch(searchValue);
    onSearchChange(searchValue);
  };

  return (
    <form className="relative flex items-center w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <img src={searchicon} className="w-5 h-5" alt="Search icon" />
        </div>
        <input
          className={`block w-full p-4 pl-12 ${style.text} ${style.background} ${style.borderSearch} rounded-lg focus:border-indigo-400 hover:border-indigo-400`}
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
    </form>
  );
};
