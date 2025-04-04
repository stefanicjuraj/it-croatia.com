// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import location from "/assets/icons/location.svg";

export const TableBody = ({ workplaces }: { workplaces: Array<object> }) => {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <tbody>
      {workplaces.map((workplace, index) => (
        <tr
          key={index}
          className={`${style.background} ${style.border} hover:shadow hover:shadow-indigo-300`}
        >
          <a
            href={(workplace as { Location: string })["Location"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <td
              className={`text-md px-7 py-5 whitespace-nowrap ${style.textTableBody}`}
            >
              {(workplace as { Workplace: string }).Workplace}
              <br />
              <a
                className="text-sm text-[#999] hover:underline"
                href={(workplace as { Location: string })["Location"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {(workplace as { Address: string })["Address"]}
              </a>
            </td>
          </a>
          <td
            className={`text-xs px-7 py-5 whitespace-nowrap ${style.textTableBody}`}
          >
            {(workplace as { Amenity: string[] })?.Amenity.map(
              (amenity, index) => (
                <span
                  key={index}
                  className={`px-3 py-2 mr-1 ${style.backgroundIndustry} ${style.industryText} rounded-lg`}
                >
                  {amenity}
                </span>
              )
            )}
          </td>
          <td className={`px-7 py-5 text-md ${style.textTableBody}`}>
            {(workplace as { City: string })["City"]}
          </td>
          <td
            className={`px-7 py-5 text-md whitespace-nowrap ${style.textTableBody}`}
          >
            {(workplace as { Area: string[] })?.Area.map((area, index) => (
              <span key={index}>{area}</span>
            ))}
          </td>
          <td className={`px-10 py-5 ${style.iconHover}`}>
            <a
              className="inline-flex items-center rounded-full hover:ring-indigo-500 focus:ring-2 focus:outline-none focus:ring-gray-200"
              href={(workplace as { Location: string })["Location"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={location} className="w-8 h-8" alt="Reddit icon" />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
