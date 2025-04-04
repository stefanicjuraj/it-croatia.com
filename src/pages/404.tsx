import { Link } from "react-router-dom";
// Utils
import { useTheme } from "../utils/Theme";
// Icons
import fourofour from "/assets/icons/404.svg";

export default function Header() {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <header
      className={`max-w-screen-xl mt-40 mx-auto mb-16 sm:p-16 px-8 py-12 ${style.backgroundHeader} rounded-3xl text-left ${style.shadowHeader}`}
    >
      <div className="flex items-center mb-8">
        <img src={fourofour} className="mr-3 sm:w-12 w-9" alt="Company icon" />
        <h1 className={`text-4xl font-bold ${style.headingH1} sm:text-6xl`}>
          404 Not Found
        </h1>
      </div>
      <p className={`w-full ${style.text} text-md sm:text-lg sm:w-3/4`}>
        Oops! Looks like you got lost. Try another page:{" "}
        <span
          className={`bg-[#333] ${style.backgroundHeaderText} px-1 py-0.3 rounded-lg underline`}
        >
          <Link to="/companies">companies</Link>
        </span>
        ,{" "}
        <span
          className={`bg-[#333] ${style.backgroundHeaderText} px-1 py-0.3 rounded-lg underline`}
        >
          <Link to="/conferences">conferences</Link>
        </span>
        ,{" "}
        <span
          className={`bg-[#333] ${style.backgroundHeaderText} px-1 py-0.3 rounded-lg underline`}
        >
          <Link to="/education">education</Link>
        </span>
        ,{" "}
        <span
          className={`bg-[#333] ${style.backgroundHeaderText} px-1 py-0.3 rounded-lg underline`}
        >
          <Link to="/certificates">certificates</Link>
        </span>
        ,{" "}
        <span
          className={`bg-[#333] ${style.backgroundHeaderText} px-1 py-0.3 rounded-lg underline`}
        >
          <Link to="/communities">communities</Link>
        </span>
        ,{" "}
        <span
          className={`bg-[#333] ${style.backgroundHeaderText} px-1 py-0.3 rounded-lg underline`}
        >
          <Link to="/places-to-work">places to work</Link>
        </span>
        ,{" "}
        <span
          className={`bg-[#333] ${style.backgroundHeaderText} px-1 py-0.3 rounded-lg underline`}
        >
          <Link to="/podcasts">podcasts</Link>
        </span>
        ,{" "}
        <span
          className={`bg-[#333] ${style.backgroundHeaderText} px-1 py-0.3 rounded-lg underline`}
        >
          <Link to="/internships">internships</Link>
        </span>
        ,{" "}
        <span
          className={`bg-[#333] ${style.backgroundHeaderText} px-1 py-0.3 rounded-lg underline`}
        >
          <Link to="/contribute">contributions</Link>
        </span>{" "}
        or go to the{" "}
        <span
          className={`bg-[#333] ${style.backgroundHeaderText} px-1 py-0.3 rounded-lg underline`}
        >
          <Link to="/">home page</Link>
        </span>
        .
      </p>
    </header>
  );
}
