import { useState } from "react";
// Hooks
import { useDictionary } from "../hooks/useDictionary";
// Components
import Loading from "../components/Loading";
import Header from "../components/Dictionary/Header";
import { Search } from "../components/Search";
import TableHead from "../components/Dictionary/TableHead";
import { TableBody } from "../components/Dictionary/TableBody";
import Footer from "../components/Footer";
// Utils
import { useTheme } from "../utils/Theme";

export default function Dictionary() {
  const { dictionary, loading, error } = useDictionary();
  const [wordSearch, setwordSearch] = useState("");
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  const searchCommunity = dictionary.filter((dictionary) => {
    const communityName = dictionary.English.toLowerCase();
    const search = wordSearch.toLowerCase();
    return communityName.includes(search);
  });

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
          <section className="relative max-w-screen-lg px-4 mx-auto sm:px-0 animation glow delay-1">
            <div className="flex flex-wrap items-center mb-8 sm:flex-nowrap">
              <div className={`relative mr-4 ${style.text} sm:w-96 w-80`}>
                <Search
                  onSearchChange={setwordSearch}
                  placeholder="Search words"
                />
                <p
                  className={`absolute right-2 bottom-2 ${style.backgroundFilters} rounded-full px-5 py-2`}
                >
                  {searchCommunity.length} results
                </p>
              </div>
            </div>
          </section>
          <section className="px-4 mx-auto mb-40">
            <div className="max-w-screen-lg mx-auto overflow-x-auto rounded-t-xl rounded-b-xl">
              <table className="w-full text-left text-white">
                <TableHead />
                <TableBody dictionary={searchCommunity} />
              </table>
            </div>
          </section>
        </div>
      )}
      <Footer />
    </div>
  );
}
