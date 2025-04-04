import { useEffect, useState } from "react";
// Hooks
import { useCommunity } from "../hooks/useCommunity";
// Components
import Loading from "../components/Loading";
import Header from "../components/Community/Header";
import { Search } from "../components/Search";
import { FilterPlatform } from "../components/Community/FilterPlatform";
import TableHead from "../components/Community/TableHead";
import { TableBody } from "../components/Community/TableBody";
import Footer from "../components/Footer";
// Utils
import { useTheme } from "../utils/Theme";

export default function Communities() {
  const { community, loading, error } = useCommunity();
  const [communitySearch, setCommunitySearch] = useState("");
  const [selectPlatforms, setSelectPlatforms] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  useEffect(() => {
    const platforms = [
      ...new Set(community.map((community) => community.Platform)),
    ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    setPlatforms(platforms);
  }, [community]);

  const searchCommunity = community.filter((community) => {
    const communityName = community.Community.toLowerCase();
    const communityPlatform =
      selectPlatforms.length === 0 ||
      selectPlatforms.includes(community.Platform);
    const search = communitySearch.toLowerCase();
    return communityName.includes(search) && communityPlatform;
  });

  const handlePlatformCheckboxInput = (location: string) => {
    setSelectPlatforms((prevPlatforms) =>
      prevPlatforms.includes(location)
        ? prevPlatforms.filter((l) => l !== location)
        : [...prevPlatforms, location]
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
                  onSearchChange={setCommunitySearch}
                  placeholder="Search communities"
                />
                <p
                  className={`absolute right-2 bottom-2 ${style.backgroundFilters} rounded-full px-5 py-2`}
                >
                  {searchCommunity.length} results
                </p>
              </div>
              <FilterPlatform
                platform={platforms}
                selectPlatforms={selectPlatforms}
                checkboxInput={handlePlatformCheckboxInput}
              />
            </div>
          </section>
          <section className="px-4 mx-auto mb-40">
            <div className="max-w-screen-xl mx-auto overflow-x-auto rounded-t-xl rounded-b-xl">
              <table className="w-full text-left text-white">
                <TableHead />
                <TableBody communities={searchCommunity} />
              </table>
            </div>
          </section>
        </div>
      )}
      <Footer />
    </div>
  );
}
