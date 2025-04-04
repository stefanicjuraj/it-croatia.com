// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import chevron from "/assets/icons/sort.svg";

export default function TableHead({ sortDates }: { sortDates: () => void }) {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <thead
      className={`text-lg ${style.textTableHead} ${style.background} ${style.border}`}
    >
      <tr>
        <th scope="col" className="py-8 px-7">
          Conference
        </th>
        <th scope="col" className="py-8 px-7">
          Organizer
        </th>
        <th scope="col" className="py-8 px-7">
          Location
        </th>
        <th
          scope="col"
          className="flex py-8 cursor-pointer px-7"
          onClick={sortDates}
        >
          Dates
          <img src={chevron} className="w-5 h-5 mt-1 ml-2" />
        </th>
        <th scope="col" className="py-8 px-7">
          Ticket
        </th>
      </tr>
    </thead>
  );
}
