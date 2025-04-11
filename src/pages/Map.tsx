import { useEffect, useState } from "react";
import Company from "../types/company";
// Components
import Map from "../components/Map";
// Utils
import { useTheme } from "../utils/Theme";

export default function MapPage() {
  const [companiesByCity, setCompaniesByCity] = useState<{
    [city: string]: Company[];
  }>({});
  const [loading, setLoading] = useState(true);
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/data/companies.json");
        const data = await response.json();

        const cityGroups: { [city: string]: Company[] } = {};
        data.companies.forEach((company: Company) => {
          company.Location.forEach((location: string) => {
            if (!cityGroups[location]) {
              cityGroups[location] = [];
            }
            cityGroups[location].push(company);
          });
        });

        setCompaniesByCity(cityGroups);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className={`${style.backgroundBody} mx-auto pt-24 pb-64`}>
        <header
          className={`max-w-screen-lg mx-auto mb-8 text-left sm:p-0 px-4 sm:px-4 p-4`}
        >
          <div className="flex items-center mb-8">
            <h1 className={`text-5xl font-bold ${style.headingH1} sm:text-6xl`}>
              Map of IT Companies in Croatia
            </h1>
          </div>
          <p className={`w-full ${style.text} text-md sm:text-lg sm:w-3/4`}>
            Explore IT companies across Croatia by location.
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className={`${style.backgroundBody} mx-auto pt-24 pb-64`}>
      <header
        className={`max-w-screen-lg mx-auto mb-8 text-left sm:p-0 px-4 sm:px-4 p-4`}
      >
        <div className="flex items-center mb-8">
          <h1 className={`text-5xl font-bold ${style.headingH1} sm:text-6xl`}>
            Map of IT Companies in Croatia
          </h1>
        </div>
        <p className={`w-full ${style.text} text-md sm:text-lg sm:w-3/4`}>
          Explore IT companies across Croatia by location.
        </p>
      </header>

      <div className="max-w-screen-lg mx-auto h-[600px] w-full rounded-lg overflow-hidden border border-[#555] z-0 animation glow delay-1">
        <Map companiesByCity={companiesByCity} />
      </div>
    </div>
  );
}
