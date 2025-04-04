// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import join from "/assets/icons/apply.svg";

export const TableBody = ({ communities }: { communities: Array<object> }) => {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <tbody>
      {communities.map((community, index) => (
        <tr
          key={index}
          className={`${style.background} ${style.border} hover:shadow hover:shadow-indigo-300`}
        >
          <a
            href={(community as { Join: string })["Join"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <td
              className={`text-md px-7 py-5 whitespace-nowrap ${style.textTableBody}`}
            >
              {(community as { Community: string }).Community}
              <p className="mt-4">
                {(community as { Topic: Array<string> }).Topic.map(
                  (topic, index) => (
                    <span
                      className={`text-xs px-3 py-2 mr-1 ${style.backgroundIndustry} ${style.industryText} rounded-lg`}
                      key={index}
                    >
                      {topic}
                    </span>
                  )
                )}
              </p>
            </td>
          </a>
          <td
            className={`text-md px-7 py-5 whitespace-nowrap ${style.textTableBody}`}
          >
            {(community as { Platform: string }).Platform}
          </td>
          <td className="px-8 text-lg py-5">
            <a
              className="inline-flex items-center hover:ring-indigo-500 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-xl"
              href={(community as { Join: string })["Join"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={join} className="w-8 h-8" alt="Join community icon" />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
