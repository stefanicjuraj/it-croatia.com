// Utils
import { useTheme } from "../../utils/Theme";

export const TableBody = ({ dictionary }: { dictionary: Array<object> }) => {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <tbody>
      {dictionary.map((word, index) => (
        <tr key={index} className={`${style.background} ${style.border}`}>
          <td className={`text-md px-7 py-7 ${style.textTableBody}`}>
            {(word as { English: string }).English}
          </td>
          <td className={`text-md ${style.textTableBody} px-5 py-7`}>
            {(word as { Croatian: string }).Croatian}
            <br />
            <span className={`text-sm ${style.linkText}`}>
              {(word as { Definition: string }).Definition}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
