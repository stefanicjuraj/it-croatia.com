import { useEffect, useState } from "react";
// Hooks
import { useCertificate } from "../hooks/useCertificate";
// Components
import Loading from "../components/Loading";
import Header from "../components/Certificate/Header";
import { Search } from "../components/Search";
import { FilterOrganizer } from "../components/Certificate/FilterOrganizer";
import TableHead from "../components/Certificate/TableHead";
import { TableBody } from "../components/Certificate/TableBody";
import Footer from "../components/Footer";
import { ScrollToTopComponent } from "../components/ScrollToTop";
// Utils
import { useTheme } from "../utils/Theme";

export default function Certificates() {
  const { certificates, loading, error } = useCertificate();
  const [certificateSearch, setCertificateSearch] = useState("");
  const [selectOrganizer, setselectOrganizer] = useState<string[]>([]);
  const [organizer, setOrganizer] = useState<string[]>([]);
  [];
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  useEffect(() => {
    const organizer = [
      ...new Set(certificates.map((certificates) => certificates.Organizer)),
    ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    setOrganizer(organizer);
  }, [certificates]);

  const searchCertificate = certificates.filter((certificates) => {
    const certificateName = certificates.Certificate.toLowerCase();
    const certificateOrganizer =
      selectOrganizer.length === 0 ||
      selectOrganizer.includes(certificates.Organizer);
    const search = certificateSearch.toLowerCase();
    return certificateName.includes(search) && certificateOrganizer;
  });

  const handleOrganizerCheckboxInput = (organizer: string) => {
    setselectOrganizer((prevOrganizer) =>
      prevOrganizer.includes(organizer)
        ? prevOrganizer.filter((l) => l !== organizer)
        : [...prevOrganizer, organizer]
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
              <div className={`relative mr-4 ${style.text} sm:w-96 w-80`}>
                <Search
                  onSearchChange={setCertificateSearch}
                  placeholder="Search certificates"
                />
                <p
                  className={`absolute right-2 bottom-2 ${style.backgroundFilters} rounded-full px-5 py-2`}
                >
                  {searchCertificate.length} results
                </p>
              </div>
              <FilterOrganizer
                organizer={organizer}
                selectOrganizer={selectOrganizer}
                checkboxInput={handleOrganizerCheckboxInput}
              />
            </div>
          </section>
          <section className="px-4 mx-auto mb-40">
            <div className="max-w-screen-xl mx-auto overflow-x-auto rounded-t-xl rounded-b-xl">
              <table className="w-full text-left text-white">
                <TableHead />
                <TableBody certificate={searchCertificate} />
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
