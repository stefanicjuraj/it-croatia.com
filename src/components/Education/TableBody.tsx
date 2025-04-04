// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import apply from "/assets/icons/apply.svg";

export const TableBody = ({ education }: { education: Array<object> }) => {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <tbody>
      {education.map((education, index) => (
        <tr
          key={index}
          className={`${style.background} ${style.border} hover:shadow hover:shadow-indigo-300`}
        >
          <a
            href={(education as { Enroll: string })?.Enroll}
            target="_blank"
            rel="noopener noreferrer"
          >
            <td
              className={`text-md px-7 py-5 whitespace-nowrap ${style.textTableBody}`}
            >
              {(education as { Course: string })?.Course}
              <p className="mt-4">
                {(education as { Topic: string[] })?.Topic.map(
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
            {(education as { Organizer: string })?.Organizer}
          </td>
          <td className={`px-7 py-5 text-md ${style.textTableBody}`}>
            {(education as { Type: string })?.Type}
          </td>
          <td className={`px-10 py-5 ${style.iconHover}`}>
            <a
              className="inline-flex items-center hover:ring-indigo-500 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-xl"
              href={(education as { Enroll: string })?.Enroll}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={apply}
                className="w-8 h-8"
                alt="Apply for education icon"
              />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
