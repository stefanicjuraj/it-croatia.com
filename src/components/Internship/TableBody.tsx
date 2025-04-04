// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import apply from "/assets/icons/apply.svg";

export const TableBody = ({ internships }: { internships: Array<object> }) => {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <tbody>
      {internships.map((internship, index) => (
        <tr
          key={index}
          className={`${style.background} ${style.border} hover:shadow hover:shadow-indigo-300`}
        >
          <a
            href={(internship as { Apply: string })["Apply"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <td
              className={`text-md px-7 py-5 whitespace-nowrap ${style.textTableBody}`}
            >
              {(internship as { Internship: string }).Internship}
              <p className="mt-4">
                {(internship as { Department: string[] }).Department.map(
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
            {(internship as { Company: string })?.Company}
          </td>
          <td className="px-10 py-5 text-lg">
            <a
              className="inline-flex items-center hover:ring-indigo-500 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-xl"
              href={(internship as { Apply: string })["Apply"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={apply}
                className="w-8 h-8"
                alt="Apply for internship icon"
              />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
