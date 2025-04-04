import { useState } from "react";
// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import chevron from "/assets/icons/chevron.svg";

export const FilterPlatform = ({
  platform,
  selectPlatforms,
  checkboxInput,
}: {
  platform: string[];
  selectPlatforms: string[];
  checkboxInput: (location: string) => void;
}) => {
  const [dropdownOpen, isDropdownOpen] = useState(false);
  const toggle = () => isDropdownOpen(!dropdownOpen);

  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <>
      <div className="relative mt-4 sm:mt-0 sm:ml-3 ml-0">
        <button
          className={`w-full flex items-center justify-center py-4 px-5 ${style.text} ${style.background} ${style.borderSearch} rounded-xl hover:border-indigo-400`}
          type="button"
          onClick={toggle}
        >
          Platform
          <span
            className={`ml-2 text-sm ${style.textFilters} rounded-full ${style.backgroundFilters} px-2.5 py-1`}
          >
            {selectPlatforms.length}
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
            className={`absolute z-10 w-42 ${style.background} shadow-md divide-y divide-gray-100 rounded-lg shadow mt-2 overflow-y-auto max-h-80`}
          >
            <ul
              className={`p-2 ${style.text} space-y-1 text-md`}
              aria-labelledby="checkbox"
            >
              {platform.map((platforms, index) => (
                <li key={index}>
                  <div
                    className={`flex items-center p-3 rounded-lg ${style.backgroundFiltersHover}`}
                  >
                    <input
                      className={`w-5 h-5 text-indigo-500 border-indigo-300 ${style.background} rounded focus:ring-indigo-500 focus:ring-1`}
                      type="checkbox"
                      id={`location-checkbox-${index}`}
                      value={platform}
                      checked={selectPlatforms.includes(platforms)}
                      onChange={() => checkboxInput(platforms)}
                    />
                    <label
                      className="ml-3 text-sm rounded"
                      htmlFor={`filter-checkbox-${index}`}
                    >
                      {platforms}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
