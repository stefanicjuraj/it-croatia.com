// Utils
import { useTheme } from "../../utils/Theme";
// Icons

export default function TableHead() {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <thead
      className={`text-lg ${style.textTableHead} ${style.background} ${style.border}`}
    >
      <tr>
        <th scope="col" className="py-8 px-7">
          English
        </th>
        <th scope="col" className="py-8 px-5 whitespace-nowrap">
          Croatian
        </th>
      </tr>
    </thead>
  );
}
