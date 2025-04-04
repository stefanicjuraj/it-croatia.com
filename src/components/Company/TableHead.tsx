// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import chevron from "/assets/icons/sort.svg";

export default function TableHead({
  sortEmployees,
}: {
  sortEmployees: () => void;
}) {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <thead
      className={`text-lg ${style.textTableHead} ${style.background} ${style.border}`}
    >
      <tr>
        <th scope="col" className="py-8 px-7">
          Company
        </th>
        <th scope="col" className="px-5 py-8">
          Industry
        </th>
        <th scope="col" className="py-8 px-7">
          Location
        </th>
        <th
          scope="col"
          className="flex px-5 py-8 cursor-pointer"
          onClick={sortEmployees}
        >
          Employees
          <img
            src={chevron}
            className="w-5 h-5 mt-1 ml-2 transition-transform"
          />
        </th>
        <th scope="col" className="px-6 py-8">
          LinkedIn
        </th>
        <th scope="col" className="px-3 py-8">
          Glassdoor
        </th>
        <th scope="col" className="py-8 px-7">
          Reddit
        </th>
      </tr>
    </thead>
  );
}
