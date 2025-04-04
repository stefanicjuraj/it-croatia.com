import { useTheme } from "../../utils/Theme";

export default function Header() {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  return (
    <header className={`max-w-screen-xl mx-auto mb-8 text-left sm:p-0 p-4`}>
      <div className="flex items-center mb-8">
        <h1 className={`text-5xl font-bold ${style.headingH1} sm:text-6xl`}>
          IT Education in Croatia
        </h1>
      </div>
      <p className={`w-full ${style.text} text-md sm:text-lg sm:w-3/4`}>
        A collection of IT education in Croatia. Enroll into colleges, courses,
        lectures, and classes to learn more about IT and software development.
      </p>
    </header>
  );
}
