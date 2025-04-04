import { ReactNode, createContext, useContext, useState } from "react";

interface ThemeType {
  theme: string;
  toggleTheme: () => void;
  themeClasses: (theme: string) => {
    // background
    backgroundBody: string;
    background: string;
    backgroundNavbar: string;
    backgroundHeader: string;
    backgroundFilters: string;
    backgroundFiltersHover: string;
    backgroundHeaderText: string;
    backgroundIndustry: string;
    // heading
    headingH1: string;
    heading: string;
    shadowHeader: string;
    // border
    border: string;
    borderSearch: string;
    borderSearchDropdown: string;
    // text
    text: string;
    textTableHead: string;
    textTableBody: string;
    textFilters: string;
    linkText: string;
    industryText: string;
    iconHover: string;
    iconBg: string;
  };
}

const Theme = createContext<ThemeType>({
  theme: "dark",
  toggleTheme: () => {},
  themeClasses: () => ({
    // background
    backgroundBody: "",
    background: "",
    backgroundNavbar: "",
    backgroundHeader: "",
    backgroundFilters: "",
    backgroundFiltersHover: "",
    backgroundIndustry: "",
    backgroundHeaderText: "",
    // heading
    headingH1: "",
    heading: "",
    shadowHeader: "",
    // border
    border: "",
    borderSearch: "",
    borderSearchDropdown: "",
    // text
    text: "",
    textTableHead: "",
    textTableBody: "",
    textFilters: "",
    linkText: "",
    industryText: "",
    iconHover: "",
    iconBg: "",
  }),
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const themeClasses = (theme: string) => {
    return theme === "dark"
      ? {
          // background
          backgroundBody: "bg-[#111]",
          background: "bg-[#222]",
          backgroundNavbar: "bg-[#111]",
          backgroundHeader: "bg-[#222]",
          backgroundFilters: "bg-[#333]",
          backgroundFiltersHover: "hover:bg-[#333]",
          backgroundIndustry: "bg-indigo-500",
          backgroundHeaderText: "bg-[#333]",
          // heading
          headingH1: "text-indigo-300",
          heading: "text-white",
          shadowHeader: "shadow-md shadow-[#111]",
          // border
          border: "border-t border-[#333]",
          borderSearch: "border border-[#222]",
          borderSearchDropdown: "border border-[#333]",
          // text
          text: "text-white",
          textTableHead: "text-white",
          textTableBody: "text-white",
          textFilters: "text-white",
          linkText: "text-[#999]",
          industryText: "text-white",
          // icon
          iconHover:
            "hover:shadow hover:ring-indigo-500 focus:ring-2 focus:outline-none focus:ring-gray-200",
          iconBg: "rounded-xl",
        }
      : {
          // background
          backgroundBody: "bg-white",
          background: "bg-[#f5f5f5]",
          backgroundNavbar: "bg-white",
          backgroundHeader: "bg-[#f5f5f5]",
          backgroundHeaderText: "bg-[#e5e5e5]",
          backgroundFilters: "bg-[#e5e5e5]",
          backgroundFiltersHover: "hover:bg-[#e5e5e5]",
          // heading
          headingH1: "text-indigo-400",
          heading: "text-black",
          shadowHeader: "shadow-md shadow-[#e5e5e5]",
          // border
          border: "border-b border-[#ccc]",
          borderSearch: "border border-[#f5f5f5]",
          borderSearchDropdown: "border border-[#ccc]",
          // text
          text: "text-[#111]",
          textTableHead: "text-[#333]",
          textTableBody: "text-[#111]",
          textFilters: "text-black",
          linkText: "text-[#999]",
          backgroundIndustry: "bg-indigo-500",
          industryText: "text-white",
          // icon
          iconHover:
            "hover:ring-blue-500 focus:ring-2 focus:outline-none focus:ring-gray-300",
          iconBg: "rounded-xl",
        };
  };

  return (
    <Theme.Provider
      value={{ theme, toggleTheme, themeClasses: () => themeClasses(theme) }}
    >
      {children}
    </Theme.Provider>
  );
};

export const useTheme = () => useContext(Theme);
