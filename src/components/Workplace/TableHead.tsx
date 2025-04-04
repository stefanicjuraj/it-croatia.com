import { useTheme } from "../../utils/Theme";

export default function TableHead() {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <thead
      className={`text-lg ${style.textTableHead} ${style.background} ${style.border}`}
    >
      <tr>
        <th scope="col" className="py-8 px-7">
          Place to Work
        </th>
        <th scope="col" className="py-8 px-7">
          Amenities
        </th>
        <th scope="col" className="py-8 px-7">
          City
        </th>
        <th scope="col" className="py-8 px-7">
          Area
        </th>
        <th scope="col" className="py-8 px-7">
          Location
        </th>
      </tr>
    </thead>
  );
}
