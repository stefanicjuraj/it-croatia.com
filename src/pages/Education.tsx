import { useEffect, useState } from "react";
// Hooks
import { useEducation } from "../hooks/useEducation";
// Components
import Loading from "../components/Loading";
import Header from "../components/Education/Header";
import { Search } from "../components/Search";
import { FilterOrganizer } from "../components/Education/FilterOrganizer";
import { FilterType } from "../components/Education/FilterType";
import TableHead from "../components/Education/TableHead";
import { TableBody } from "../components/Education/TableBody";
import Footer from "../components/Footer";
import { ScrollToTopComponent } from "../components/ScrollToTop";
// Utils
import { useTheme } from "../utils/Theme";

export default function Education() {
  const { education, loading, error } = useEducation();
  const [educationSearch, setEducationSearch] = useState("");
  const [selectOrganizer, setselectOrganizer] = useState<string[]>([]);
  const [organizer, setOrganizer] = useState<string[]>([]);
  const [selectType, setselectType] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  useEffect(() => {
    const organizer = [
      ...new Set(education.map((education) => education.Organizer)),
    ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    setOrganizer(organizer);
  }, [education]);

  useEffect(() => {
    const type = [
      ...new Set(education.map((education) => education.Type)),
    ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    setType(type);
  }, [education]);

  const searchEducation = education.filter((education) => {
    const educationName = education.Course.toLowerCase();
    const educationOrganizer =
      selectOrganizer.length === 0 ||
      selectOrganizer.includes(education.Organizer);
    const educationType =
      selectType.length === 0 || selectType.includes(education.Type);
    const search = educationSearch.toLowerCase();
    return (
      educationName.includes(search) && educationOrganizer && educationType
    );
  });

  const handleOrganizerCheckboxInput = (organizer: string) => {
    setselectOrganizer((prevOrganizer) =>
      prevOrganizer.includes(organizer)
        ? prevOrganizer.filter((l) => l !== organizer)
        : [...prevOrganizer, organizer]
    );
  };

  const handleTypeCheckboxInput = (type: string) => {
    setselectType((prevType) =>
      prevType.includes(type)
        ? prevType.filter((l) => l !== type)
        : [...prevType, type]
    );
  };

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className={`${style.backgroundBody}`}>
      <div className="pt-40">
        <Header />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className={`${style.backgroundBody}`}>
          <section className="relative max-w-screen-xl px-4 mx-auto sm:px-0 animation glow delay-1">
            <div className="flex flex-wrap items-center mb-8 sm:flex-nowrap">
              <div className={`relative mr-4 ${style.text} sm:w-96 w-80`}>
                <Search
                  onSearchChange={setEducationSearch}
                  placeholder="Search education"
                />
                <p
                  className={`absolute right-2 bottom-2 ${style.backgroundFilters} rounded-full px-5 py-2`}
                >
                  {searchEducation.length} results
                </p>
              </div>
              <FilterOrganizer
                organizer={organizer}
                selectOrganizer={selectOrganizer}
                checkboxInput={handleOrganizerCheckboxInput}
              />
              <FilterType
                type={type}
                selectType={selectType}
                checkboxInput={handleTypeCheckboxInput}
              />
            </div>
          </section>
          <section className="px-4 mx-auto mb-40">
            <div className="max-w-screen-xl mx-auto overflow-x-auto rounded-t-xl rounded-b-xl">
              <table className="w-full text-left text-white">
                <TableHead />
                <TableBody education={searchEducation} />
              </table>
            </div>
          </section>
        </div>
      )}

      <Footer />

      <ScrollToTopComponent />
    </div>
  );
}
