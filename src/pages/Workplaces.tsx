import { useEffect, useState } from "react";
// Hooks
import { useWorkplace } from "../hooks/useWorkplace";
// Components
import Loading from "../components/Loading";
import Header from "../components/Workplace/Header";
import { Search } from "../components/Search";
import { FilterCity } from "../components/Workplace/FilterCity";
import { FilterArea } from "../components/Workplace/FilterArea";
import TableHead from "../components/Workplace/TableHead";
import { TableBody } from "../components/Workplace/TableBody";
import Footer from "../components/Footer";
import { ScrollToTopComponent } from "../components/ScrollToTop";
// Utils
import { useTheme } from "../utils/Theme";
// Icons
import location from "/assets/icons/location.svg";

export default function Workplaces() {
  const { workplace, loading, error } = useWorkplace();
  const [workplaceSearch, setWorkplaceSearch] = useState("");
  const [selectLocations, setselectLocations] = useState<string[]>([]);
  const [selectArea, setSelectArea] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [area, setArea] = useState<string[]>([]);
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  useEffect(() => {
    const uniqueLocations = [...new Set(workplace.map((w) => w.City))].sort(
      (a, b) => a.toLowerCase().localeCompare(b.toLowerCase())
    );
    setLocations(uniqueLocations);

    const uniqueNeighbourhoods = [
      ...new Set(workplace.flatMap((w) => w.Area)),
    ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    setArea(uniqueNeighbourhoods);
  }, [workplace]);

  const searchPodcast = workplace.filter((workplace) => {
    const workplaceName = workplace.Workplace.toLowerCase();
    const matchesLocation =
      selectLocations.length === 0 || selectLocations.includes(workplace.City);
    const matchesNeighbourhood =
      selectArea.length === 0 ||
      selectArea.some((n) => (workplace.Area || []).includes(n));
    const matchesSearch = workplaceName.includes(workplaceSearch.toLowerCase());
    return matchesLocation && matchesNeighbourhood && matchesSearch;
  });

  const handleLocationCheckboxInput = (location: any) => {
    setselectLocations((prevLocations) =>
      prevLocations.includes(location)
        ? prevLocations.filter((l) => l !== location)
        : [...prevLocations, location]
    );
  };

  const handleNeighbourhoodCheckboxInput = (area: string) => {
    setSelectArea((prevNeighbourhood) =>
      prevNeighbourhood.includes(area)
        ? prevNeighbourhood.filter((n) => n !== area)
        : [...prevNeighbourhood, area]
    );
  };

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className={`${style.backgroundBody}`}>
      <div className="pt-24">
        <Header />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className={`${style.backgroundBody}`}>
          <section className="relative max-w-screen-xl px-4 mx-auto sm:px-0 animation glow delay-1">
            <div className="flex flex-wrap items-center mb-8 sm:flex-nowrap">
              <div className={`relative mr-4 ${style.text} sm:w-96 w-full`}>
                <Search
                  onSearchChange={setWorkplaceSearch}
                  placeholder="Search work places"
                />
                <p
                  className={`absolute right-2 bottom-2 ${style.backgroundFilters} rounded-full px-5 py-2`}
                >
                  {searchPodcast.length} results
                </p>
              </div>
              <FilterCity
                locations={locations}
                selectLocations={selectLocations}
                checkboxInput={handleLocationCheckboxInput}
              />
              <FilterArea
                area={area}
                selectArea={selectArea}
                checkboxInput={handleNeighbourhoodCheckboxInput}
              />
              <a
                href="#map"
                className={`mt-4 sm:mt-0 sm:ml-3 ml-0 flex items-center justify-center py-4 px-5 ${style.text} ${style.backgroundHeader} ${style.borderSearch} rounded-xl hover:border-indigo-400`}
              >
                <img src={location} className="mr-1"></img>
                <span className="mr-3">View on Maps</span>
              </a>
            </div>
          </section>
          <section className="px-4 mx-auto mb-32">
            <div className="max-w-screen-xl mx-auto overflow-x-auto rounded-t-xl rounded-b-xl">
              <table className="w-full text-left text-white">
                <TableHead />
                <TableBody workplaces={searchPodcast} />
              </table>
            </div>
          </section>

          <iframe
            id="map"
            className="w-screen h-screen p-4 mx-auto mb-24 sm:w-1/2"
            src="https://www.google.com/maps/d/embed?mid=1PW03rTtZLnVjmuEoMqnctLVU3TrYZpQ&hl=en&ehbc=2E312F"
            width="720"
            height="560"
          ></iframe>

          <hr className="border-[#333] max-w-screen-xl mx-auto" />

          <iframe
            className="w-screen h-screen p-4 mx-auto mt-24 sm:w-1/2"
            src="https://www.google.com/maps/d/embed?mid=1uIsPAY4AMFlQ5kE4cI7VMW4yky0&ehbc=2E312F"
            width="720"
            height="560"
          ></iframe>
        </div>
      )}

      <Footer />

      <ScrollToTopComponent />
    </div>
  );
}
