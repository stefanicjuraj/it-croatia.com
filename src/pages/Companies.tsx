import React from "react";
import { useEffect, useState } from "react";
// Hooks
import { useCompany } from "../hooks/useCompany";
// Components
import Loading from "../components/Loading";
import Header from "../components/Company/Header";
import { Search } from "../components/Search";
import { FilterIndustry } from "../components/Company/FilterIndustry";
import { FilterLocation } from "../components/Company/FilterLocation";
import TableHead from "../components/Company/TableHead";
import { TableBody } from "../components/Company/TableBody";
import Footer from "../components/Footer";
import { ScrollToTopComponent } from "../components/ScrollToTop";
// Utils
import { useTheme } from "../utils/Theme";

export default function Companies() {
  const {
    companies,
    loading,
    error,
    industryTags,
    checkboxInput,
    tags,
    mapTags,
  } = useCompany();
  const [companySearch, setCompanySearch] = useState("");
  const [selectLocations, setselectLocations] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("");
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  useEffect(() => {
    const sortLocations = [
      ...new Set(companies.flatMap((company) => company.Location)),
    ].sort((a, b) => {
      if (a === "Remote") return -1;
      if (b === "Remote") return 1;
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    setLocations(sortLocations);
  }, [companies]);

  const searchCompany = companies.filter((company) => {
    const companyName = company.Company.toLowerCase();
    const companyIndustry = Array.isArray(company.Industry)
      ? company.Industry.some((industry) => tags.includes(industry))
      : false;
    const companyLocation =
      selectLocations.length === 0 ||
      company.Location.some((location) => selectLocations.includes(location));
    const search = companySearch.toLowerCase();
    return (
      companyName.includes(search) &&
      (tags.length === 0 || companyIndustry) &&
      companyLocation
    );
  });

  const sortEmployees = React.useMemo(() => {
    return searchCompany.slice().sort((a, b) => {
      if (sortOrder === "asc") {
        return Number(a.Employees) - Number(b.Employees);
      } else if (sortOrder === "desc") {
        return Number(b.Employees) - Number(a.Employees);
      }
      return 0;
    });
  }, [searchCompany, sortOrder]);

  const toggleSortEmployees = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const handleLocationCheckboxInput = (location: string) => {
    setselectLocations((prevLocations) =>
      prevLocations.includes(location)
        ? prevLocations.filter((l) => l !== location)
        : [...prevLocations, location]
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
                  onSearchChange={setCompanySearch}
                  placeholder="Search companies"
                />
                <p
                  className={`absolute right-2 bottom-2 ${style.backgroundFilters} rounded-full px-5 py-2`}
                >
                  {searchCompany.length} results
                </p>
              </div>
              <FilterIndustry
                industryTags={industryTags}
                tags={tags}
                mapTags={mapTags}
                checkboxInput={checkboxInput}
              />
              <FilterLocation
                locations={locations}
                selectLocations={selectLocations}
                checkboxInput={handleLocationCheckboxInput}
              />
            </div>
          </section>
          <section className="px-4 mx-auto mb-40">
            <div className="max-w-screen-xl mx-auto overflow-x-auto rounded-t-xl rounded-b-xl">
              <table className="w-full text-left text-white">
                <TableHead sortEmployees={toggleSortEmployees} />
                <TableBody companies={sortEmployees} />
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
