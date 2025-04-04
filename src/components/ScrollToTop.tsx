// Hooks
import { useShowScrollToTop } from "../hooks/useScrollToTop";
// Utils
import { useTheme } from "../utils/Theme";
// Icons
import arrow from "/assets/icons/arrow-up.svg";

export const ScrollToTopComponent: React.FC = () => {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  const isShown = useShowScrollToTop();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isShown) {
    return null;
  }

  return (
    <button
      className={`w-12 h-12 mr-3 mb-3 ${style.background} border border-indigo-400 rounded-lg flex justify-center items-center fixed bottom-0 right-0 z-10`}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <img src={arrow} alt="Back to top arrow icon" className="w-5 h-5" />
    </button>
  );
};
