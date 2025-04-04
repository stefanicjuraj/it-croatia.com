// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import apply from "/assets/icons/apply.svg";

export const TableBody = ({ certificate }: { certificate: Array<object> }) => {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <tbody>
      {certificate.map((certificate, index) => (
        <tr
          key={index}
          className={`${style.background} ${style.border} hover:shadow hover:shadow-indigo-300`}
        >
          <a
            href={(certificate as { Enroll: string })["Enroll"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <td
              className={`text-md px-7 py-5 whitespace-nowrap ${style.textTableBody}`}
            >
              {(certificate as { Certificate: string }).Certificate}
              <p className="mt-4">
                {(certificate as { Topic: string[] }).Topic.map(
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
            {(certificate as { Organizer: string })["Organizer"]}
          </td>
          <td className="px-10 text-lg py-5">
            <a
              href={(certificate as { Enroll: string })["Enroll"]}
              className="inline-flex items-center hover:ring-indigo-500 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={apply}
                className="w-8 h-8"
                alt="Apply for certificate icon"
              />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
