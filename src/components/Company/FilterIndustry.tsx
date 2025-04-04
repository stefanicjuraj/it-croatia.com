import { useState } from "react";
// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import chevron from "/assets/icons/chevron.svg";

export const FilterIndustry = ({
  industryTags,
  tags,
  mapTags,
  checkboxInput,
}: {
  industryTags: string[];
  tags: string[];
  mapTags: Record<string, string>;
  checkboxInput: (tag: string) => void;
}) => {
  const [dropdownOpen, isDropdownOpen] = useState(false);
  const toggle = () => isDropdownOpen(!dropdownOpen);

  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <>
      <div className="relative mt-4 ml-0 sm:mt-0 sm:ml-3">
        <button
          className={`w-full flex items-center justify-center py-4 px-5 ${style.text} ${style.background} ${style.borderSearch} rounded-xl hover:border-indigo-400`}
          type="button"
          onClick={toggle}
        >
          Industry
          <span
            className={`ml-2 text-sm ${style.textFilters} rounded-full ${style.backgroundFilters} px-2.5 py-1`}
          >
            {tags.length}
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
              {industryTags.map((tag, index) => (
                <li key={index}>
                  <div
                    className={`flex items-center p-3 rounded-lg ${style.backgroundFiltersHover}`}
                  >
                    <input
                      className={`w-5 h-5 text-indigo-500 border-indigo-300 ${style.background} rounded focus:ring-indigo-500 focus:ring-1`}
                      type="checkbox"
                      id={`filter-checkbox-${index}`}
                      value={tag}
                      checked={tags.includes(tag)}
                      onChange={() => checkboxInput(tag)}
                    />
                    <label
                      className="ml-3 text-sm rounded"
                      htmlFor={`filter-checkbox-${index}`}
                    >
                      {mapTags[tag] || tag}
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
