// Hooks
import { useConference } from "../../hooks/useConference";
// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import ticket from "/assets/icons/ticket.svg";

export const TableBody = ({ conferences }: { conferences: Array<object> }) => {
  const { countdown } = useConference();
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <tbody>
      {conferences.map((conference, index) => (
        <tr
          key={index}
          className={`${style.background} ${style.border} hover:shadow hover:shadow-indigo-300`}
        >
          <a
            href={(conference as { Website: string })["Website"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <td
              className={`text-md px-7 py-5 whitespace-nowrap ${style.textTableBody}`}
            >
              {
                (conference as { Conference: string; Website: string })
                  .Conference
              }
              <p className="mt-4">
                {(conference as { Topic: Array<string> }).Topic.map(
                  (topic, index) => (
                    <span
                      key={index}
                      className={`text-xs px-3 py-2 mr-1 ${style.backgroundIndustry} ${style.industryText} rounded-lg`}
                    >
                      {topic}
                    </span>
                  )
                )}
              </p>
            </td>
          </a>
          <td className={`px-7 py-5 text-md ${style.textTableBody}`}>
            {(conference as { Organizer: string })["Organizer"]}
          </td>
          <td className={`px-7 py-5 text-md ${style.textTableBody}`}>
            {(conference as { Location: string }).Location}
          </td>
          <td
            className={`px-7 py-5 text-md whitespace-nowrap ${style.textTableBody}`}
          >
            {(conference as { startDate: string; endDate: string }).startDate}
            <br />
            {(conference as { endDate: string }).endDate}
            <br />
            <p className="inline-flex text-[#999] text-sm mt-1">
              <span className="flex items-center mx-auto">
                <span className="flex w-2 h-2 mr-2 bg-indigo-300 rounded-lg animate-pulse"></span>
              </span>
              {countdown((conference as { startDate: string }).startDate)}
            </p>
          </td>
          <td className={`px-10 py-5 ${style.iconHover}`}>
            <a
              className="inline-flex items-center hover:ring-indigo-500 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-xl"
              href={(conference as { Website: string })["Website"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={ticket}
                className="w-8 h-8"
                alt="Conference ticket icon"
              />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
