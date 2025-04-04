import { useTheme } from "../../utils/Theme";

export default function Header() {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <header
      className={`max-w-screen-xl mx-auto mb-16 sm:p-16 px-8 py-12 ${style.backgroundHeader} rounded-3xl text-left ${style.shadowHeader}`}
    >
      <div className="flex items-center mb-8">
        <h1 className={`text-4xl font-bold ${style.headingH1} sm:text-6xl`}>
          Podcasts
        </h1>
      </div>
      <p className={`w-full ${style.text} text-md sm:text-lg sm:w-3/4`}>
        A collection of IT{" "}
        <span
          className={`${style.backgroundHeaderText} px-1 py-0.3 rounded-lg`}
        >
          podcasts
        </span>{" "}
        in Croatia. Listen to podcasts and interviews about IT related topics
        with industry professionals and enthusiasts.
      </p>
    </header>
  );
}
