import { useState } from "react";
// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import chevron from "/assets/icons/chevron.svg";
import searchicon from "/assets/icons/search.svg";

export const FilterLocation = ({
  locations,
  selectLocations,
  checkboxInput,
}: {
  locations: string[];
  selectLocations: string[];
  checkboxInput: (location: string) => void;
}) => {
  const [dropdownOpen, isDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggle = () => isDropdownOpen(!dropdownOpen);

  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  const filterLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="relative mt-4 ml-4 sm:mt-0">
        <button
          className={`w-full flex items-center justify-center py-4 px-5 ${style.text} ${style.background} ${style.borderSearch} rounded-xl hover:border-indigo-400`}
          type="button"
          onClick={toggle}
        >
          Location
          <span
            className={`ml-2 text-sm ${style.textFilters} rounded-full ${style.backgroundFilters} px-2.5 py-1`}
          >
            {selectLocations.length}
          </span>
          <img
            src={chevron}
            className={`h-5 w-5 ml-2 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {dropdownOpen && (
          <div
            id="checkbox"
            className={`absolute z-10 w-42 ${style.background} rounded-lg shadow mt-2 overflow-y-auto max-h-80`}
          >
            <div className="relative px-2 py-1 mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <img src={searchicon} className="w-4 h-4" alt="Search icon" />
              </div>
              <input
                type="text"
                placeholder="Search locations"
                className={`w-full pl-7 h-10 ${style.background} ${style.text} border ${style.borderSearchDropdown} p-2 text-xs border rounded-lg focus:border-indigo-400 hover:border-indigo-400`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ul
              className={`px-2 py-0 ${style.text} space-y-1 text-md`}
              aria-labelledby="checkbox"
            >
              {filterLocations.map((location, index) => (
                <li key={index}>
                  <div
                    className={`flex items-center p-3 rounded-lg ${style.backgroundFiltersHover}`}
                  >
                    <input
                      className={`w-5 h-5 text-indigo-500 border-indigo-300 ${style.background} rounded focus:ring-indigo-500 focus:ring-1`}
                      type="checkbox"
                      id={`location-checkbox-${index}`}
                      value={location}
                      checked={selectLocations.includes(location)}
                      onChange={() => checkboxInput(location)}
                    />
                    <label
                      className="ml-3 text-sm rounded"
                      htmlFor={`filter-checkbox-${index}`}
                    >
                      {location}
                    </label>
                  </div>
                </li>
              ))}
              {filterLocations.length === 0 && (
                <li className={`p-3 text-center text-xs ${style.text}`}>
                  No locations found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
