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
          Contribute
        </h1>
      </div>
      <p className={`w-full ${style.text} text-md sm:text-lg sm:w-3/4`}>
        Thank you for your interest in contributing! We value your input and
        encourage you to share your expertise by suggesting new additions,
        updates, and providing valuable feedback.
      </p>
    </header>
  );
}
