// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import listen from "/assets/icons/headphones.svg";

export const TableBody = ({ podcasts }: { podcasts: Array<object> }) => {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <tbody>
      {podcasts.map((podcast, index) => (
        <tr
          key={index}
          className={`${style.background} ${style.border} hover:shadow hover:shadow-indigo-300`}
        >
          <a
            href={(podcast as { Listen: string })["Listen"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <td
              className={`text-md px-7 py-5 whitespace-nowrap ${style.textTableBody}`}
            >
              {(podcast as { Podcast: string }).Podcast}
              <p className="mt-4">
                {(podcast as { Topic: string[] })?.Topic.map((topic, index) => (
                  <span
                    key={index}
                    className={`text-xs px-3 py-2 mr-1 ${style.backgroundIndustry} ${style.industryText} rounded-lg`}
                  >
                    {topic}
                  </span>
                ))}
              </p>
            </td>
          </a>
          <td className={`px-7 py-5 text-md ${style.textTableBody}`}>
            {(podcast as { Organizer: string })["Organizer"]}
          </td>
          <td
            className={`px-7 py-5 text-md whitespace-nowrap ${style.textTableBody}`}
          >
            {(podcast as { Platforms: string[] })?.Platforms.map(
              (platforms, index) => (
                <span key={index}>{platforms}</span>
              )
            )}
          </td>
          <td className="py-5 text-lg px-9">
            <a
              className="inline-flex items-center hover:shadow hover:ring-indigo-500 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-xl"
              href={(podcast as { Listen: string })["Listen"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={listen} className="w-8 h-8" alt="Listen podcast icon" />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
