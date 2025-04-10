import { useState } from "react";
// Hooks
import { usePodcast } from "../hooks/usePodcast";
// Components
import Loading from "../components/Loading";
import Header from "../components/Podcast/Header";
import { Search } from "../components/Search";
import TableHead from "../components/Podcast/TableHead";
import { TableBody } from "../components/Podcast/TableBody";
import Footer from "../components/Footer";
// Utils
import { useTheme } from "../utils/Theme";

export default function Podcasts() {
  const { podcast, loading, error } = usePodcast();
  const [podcastSearch, setPodcastSearch] = useState("");
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  const searchPodcast = podcast?.filter((podcast) => {
    const podcastName = podcast?.Podcast?.toLowerCase();
    const search = podcastSearch.toLowerCase();
    return podcastName?.includes(search);
  });

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
              <div className={`relative mr-2 ${style.text} sm:w-96 w-full`}>
                <Search
                  onSearchChange={setPodcastSearch}
                  placeholder="Search podcasts"
                />
                <p
                  className={`absolute right-2 bottom-2 ${style.backgroundFilters} rounded-full px-5 py-2`}
                >
                  {searchPodcast.length} results
                </p>
              </div>
            </div>
          </section>
          <section className="px-4 mx-auto mb-40">
            <div className="max-w-screen-xl mx-auto overflow-x-auto rounded-t-xl rounded-b-xl">
              <table className="w-full text-left text-white">
                <TableHead />
                <TableBody podcasts={searchPodcast} />
              </table>
            </div>
          </section>
        </div>
      )}

      <Footer />
    </div>
  );
}
