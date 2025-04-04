// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import linkedin from "/assets/icons/linkedin.svg";
import reddit from "/assets/icons/reddit.svg";
import glassdoor from "/assets/icons/glassdoor.svg";

export const TableBody = ({ companies }: { companies: Array<object> }) => {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <tbody>
      {companies.map((company, index) => (
        <tr
          key={index}
          className={`${style.background} ${style.border} hover:shadow hover:shadow-indigo-300`}
        >
          <a
            href={(company as { Website: string })["Website"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <td
              className={`text-md px-7 py-5 whitespace-nowrap ${style.textTableBody}`}
            >
              {(company as { Company: string }).Company}
              <br />
              <a
                className={`text-sm ${style.linkText} hover:underline`}
                href={(company as { Website: string })["Website"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {(company as { Link: string })["Link"]}
              </a>
            </td>
          </a>
          <td
            className={`text-xs ${style.textTableBody} px-5 py-5 whitespace-nowrap`}
          >
            {(company as { Industry?: string[] }).Industry?.map(
              (industry, index) => (
                <span
                  className={`px-3 py-2 mr-1 ${style.backgroundIndustry} ${style.industryText} rounded-lg`}
                  key={index}
                >
                  {industry}
                </span>
              )
            )}
          </td>
          <td className={`px-7 py-5 text-md ${style.textTableBody}`}>
            {(company as { Location: string[] }).Location.join(" | ")}
          </td>
          <td className={`px-8 py-5 text-md ${style.textTableBody}`}>
            {(company as { Employees: string }).Employees}
          </td>
          <td className={`px-10 py-5 ${style.iconHover}`}>
            <a
              className={`inline-flex items-center ${style.iconBg}`}
              href={(company as { LinkedIn: string })["LinkedIn"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} className="w-10 h-10" alt="LinkedIn icon" />
            </a>
          </td>
          <td className={`px-10 py-5 ${style.iconHover}`}>
            <a
              className="inline-flex items-center rounded"
              href={(company as { Glassdoor: string })["Glassdoor"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={glassdoor} className="w-7 h-7" alt="Glassdoor icon" />
            </a>
          </td>
          <td className={`px-10 py-5 ${style.iconHover}`}>
            <a
              className="inline-flex items-center rounded-full"
              href={(company as { Reddit: string })["Reddit"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={reddit} className="w-8 h-8" alt="Reddit icon" />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
