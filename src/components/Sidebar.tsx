import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
// Utils
import { useTheme } from "../utils/Theme";
// Icons
import menu from "/assets/icons/menu.svg";
import company from "/assets/icons/company.svg";
import conference from "/assets/icons/conference.svg";
import internship from "/assets/icons/internship.svg";
import education from "/assets/icons/education.svg";
import certificate from "/assets/icons/certificate.svg";
import podcast from "/assets/icons/podcast.svg";
import community from "/assets/icons/community.svg";
import contribute from "/assets/icons/contribute.svg";
import placesToWork from "/assets/icons/places-to-work.svg";
import chevronRight from "/assets/icons/chevron-right.svg";
import home from "/assets/icons/home.svg";
import light from "/assets/icons/light.svg";
import dark from "/assets/icons/dark.svg";

export default function Sidebar() {
  const { theme, toggleTheme, themeClasses } = useTheme();
  const { sidebarOpen, toggleSidebar, activePath } = useSidebar();
  const [lastUpdated, setLastUpdated] = useState("");
  const style = themeClasses(theme);

  const activeClass = (path: string) => {
    const bgColor = theme === "dark" ? "bg-[#333]" : "bg-[#eee]";
    return activePath === path ? bgColor : "";
  };

  useEffect(() => {
    fetch("/data/changelog.json")
      .then((response) => response.json())
      .then((data) => {
        setLastUpdated(data.updated);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full ${style.backgroundNavbar}`}>
        <div className="px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                className="inline-flex items-center p-2 text-sm cursor-pointer"
                type="button"
                onClick={() => {
                  toggleSidebar();
                }}
                data-drawer-target="sidebar"
                aria-controls="sidebar"
              >
                <img src={menu} alt="Sidebar menu icon" className="w-7 h-7" />
              </button>
              <Link to="/">
                <img
                  src={home}
                  alt="Sidebar menu icon"
                  className="ml-3 w-7 h-7"
                />
              </Link>
            </div>
            <div
              className={`flex items-center ${style.text} text-white text-md`}
            >
              <button
                className={`py-2 px-2 ${style.background} rounded-full sm:mr-7 mr-4`}
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <img src={dark} alt="Light mode icon" className="w-5 h-5" />
                ) : (
                  <img src={light} alt="Light mode icon" className="w-5 h-5" />
                )}
              </button>
              <div>
                <p className={`${style.text} text-md`}>Last updated:</p>
                <a
                  href="https://github.com/stefanicjuraj/it-croatia/blob/main/CHANGELOG.md"
                  className={`${style.text} hover:underline`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {lastUpdated}
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="sidebar"
        className={`transition-transform duration-300 ease-in-out left-0 top-0 fixed top-0 left-0 z-40 w-72 h-screen pt-24 sm:pt-32
                ${sidebarOpen ? "md:translate-x-0" : "md:-translate-x-full"} ${
          style.backgroundNavbar
        } shadow
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className={`h-full px-3 pb-4 overflow-y-auto ${style.backgroundNavbar}`}
        >
          <ul
            className={`sm:text-lg text-md font-normal ${style.text} space-y-2`}
          >
            <li>
              <Link
                to="/companies"
                className={`flex items-center p-3 rounded-xl group ${
                  style.backgroundFiltersHover
                } ${activeClass("/companies")}`}
              >
                <img src={company} alt="Home icon" className="w-6 h-6" />
                <h1 className="flex-1 ms-2 whitespace-nowrap">Companies</h1>
                <span className="inline-flex items-center justify-center">
                  <img
                    src={chevronRight}
                    alt="Arrow right icon"
                    className="w-5 h-5"
                  />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/conferences"
                className={`flex items-center p-3 rounded-xl group ${
                  style.backgroundFiltersHover
                } ${activeClass("/conferences")}`}
              >
                <img src={conference} alt="Home icon" className="w-6 h-6" />
                <h1 className="flex-1 ms-2 whitespace-nowrap">Conferences</h1>
                <span className="inline-flex items-center justify-center">
                  <img
                    src={chevronRight}
                    alt="Arrow right icon"
                    className="w-5 h-5"
                  />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/education"
                className={`flex items-center p-3 rounded-xl group ${
                  style.backgroundFiltersHover
                } ${activeClass("/education")}`}
              >
                <img src={education} alt="Home icon" className="w-6 h-6" />
                <h1 className="flex-1 ms-3 whitespace-nowrap">Education</h1>
                <span className="inline-flex items-center justify-center">
                  <img
                    src={chevronRight}
                    alt="Arrow right icon"
                    className="w-5 h-5"
                  />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/certificates"
                className={`flex items-center p-3 rounded-xl group ${
                  style.backgroundFiltersHover
                } ${activeClass("/certificates")}`}
              >
                <img src={certificate} alt="Home icon" className="w-6 h-6" />
                <h1 className="flex-1 ms-3 whitespace-nowrap">Certificates</h1>
                <span className="inline-flex items-center justify-center">
                  <img
                    src={chevronRight}
                    alt="Arrow right icon"
                    className="w-5 h-5"
                  />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/communities"
                className={`flex items-center p-3 rounded-xl group ${
                  style.backgroundFiltersHover
                } ${activeClass("/communities")}`}
              >
                <img src={community} alt="Home icon" className="w-6 h-6" />
                <h1 className="flex-1 ms-3 whitespace-nowrap">Communities</h1>
                <span className="inline-flex items-center justify-center">
                  <img
                    src={chevronRight}
                    alt="Arrow right icon"
                    className="w-5 h-5"
                  />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/places-to-work"
                className={`flex items-center p-3 rounded-xl group ${
                  style.backgroundFiltersHover
                } ${activeClass("/places-to-work")}`}
              >
                <img src={placesToWork} alt="Home icon" className="w-6 h-6" />
                <h1 className="flex-1 ms-3 whitespace-nowrap">
                  Places to Work
                </h1>
                <span className="inline-flex items-center justify-center">
                  <img
                    src={chevronRight}
                    alt="Arrow right icon"
                    className="w-5 h-5"
                  />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/podcasts"
                className={`flex items-center p-3 rounded-xl group ${
                  style.backgroundFiltersHover
                } ${activeClass("/podcasts")}`}
              >
                <img src={podcast} alt="Home icon" className="w-6 h-6" />
                <h1 className="flex-1 ms-3 whitespace-nowrap">Podcasts</h1>
                <span className="inline-flex items-center justify-center">
                  <img
                    src={chevronRight}
                    alt="Arrow right icon"
                    className="w-5 h-5"
                  />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/internships"
                className={`flex items-center p-3 rounded-xl group ${
                  style.backgroundFiltersHover
                } ${activeClass("/internships")}`}
              >
                <img src={internship} alt="Home icon" className="w-6 h-6" />
                <h1 className="flex-1 ms-3 whitespace-nowrap">Internships</h1>
                <span className="inline-flex items-center justify-center">
                  <img
                    src={chevronRight}
                    alt="Arrow right icon"
                    className="w-5 h-5"
                  />
                </span>
              </Link>
            </li>
            <hr className={`${style.borderSearch}`} />
            <li>
              <Link
                to="/contribute"
                className={`flex items-center p-3 rounded-xl group ${
                  style.backgroundFiltersHover
                } ${activeClass("/contribute")}`}
              >
                <img
                  src={contribute}
                  alt="Contributing icon"
                  className="w-6 h-6"
                />
                <h1 className="flex-1 ms-3 whitespace-nowrap">Contribute</h1>
                <span className="inline-flex items-center justify-center">
                  <img
                    src={chevronRight}
                    alt="Arrow right icon"
                    className="w-5 h-5"
                  />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
