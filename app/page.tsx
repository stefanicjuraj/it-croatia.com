"use client";

import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "./components/dropdown";

interface Company {
  Company: string;
  Website?: string;
  Link?: string;
  Industry?: string[];
  Employees?: string;
  Location?: string[];
  LinkedIn?: string;
  Reddit?: string;
  Glassdoor?: string;
}

type SortKey = "Company" | "Employees" | "Industry" | "Location";

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [industryFilters, setIndustryFilters] = useState<string[]>([]);
  const [locationFilters, setLocationFilters] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("Company");
  const [sortAsc, setSortAsc] = useState(true);
  useEffect(() => {
    fetch("/data/companies.json")
      .then((res) => res.json())
      .then((data) => setCompanies(data.companies ?? []));
  }, []);

  const industries = useMemo(() => {
    const set = new Set<string>();
    companies.forEach((company) => company.Industry?.forEach((i) => set.add(i)));
    return Array.from(set).sort();
  }, [companies]);

  const locations = useMemo(() => {
    const set = new Set<string>();
    companies.forEach((company) => company.Location?.forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    const query = search.toLowerCase();
    return companies
      .filter((company) => {
        if (query && !company.Company.toLowerCase().includes(query)) return false;
        if (
          industryFilters.length > 0 &&
          !company.Industry?.some((i) => industryFilters.includes(i))
        )
          return false;
        if (
          locationFilters.length > 0 &&
          !company.Location?.some((l) => locationFilters.includes(l))
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        const direction = sortAsc ? 1 : -1;
        if (sortKey === "Employees") {
          return (
            (parseInt(a.Employees ?? "0") - parseInt(b.Employees ?? "0")) *
            direction
          );
        }
        if (sortKey === "Industry") {
          return (
            (a.Industry?.[0] ?? "").localeCompare(b.Industry?.[0] ?? "") *
            direction
          );
        }
        if (sortKey === "Location") {
          return (
            (a.Location?.[0] ?? "").localeCompare(b.Location?.[0] ?? "") *
            direction
          );
        }
        return a.Company.localeCompare(b.Company) * direction;
      });
  }, [companies, search, industryFilters, locationFilters, sortKey, sortAsc]);

  const hasActiveFilters = industryFilters.length > 0 || locationFilters.length > 0;

  function removeIndustry(industry: string) {
    setIndustryFilters((prev) => prev.filter((i) => i !== industry));
  }

  function removeLocation(location: string) {
    setLocationFilters((prev) => prev.filter((l) => l !== location));
  }

  function clearAllFilters() {
    setIndustryFilters([]);
    setLocationFilters([]);
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function sortIndicator(key: SortKey) {
    return sortKey === key ? (sortAsc ? " \u2191" : " \u2193") : "";
  }

  return (
    <div className="min-h-screen text-[var(--foreground)] font-mono">
      <header className="sticky top-0 z-10 border-b border-neutral-200 backdrop-blur-xl dark:border-neutral-800">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                IT Croatia
              </h1>
              <h2 className="text-md text-neutral-500 dark:text-neutral-400 mt-1">
              Collection of IT companies, startups, agencies, and consultancies in Croatia 🇭🇷
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 rounded border border-neutral-300 bg-transparent px-2.5 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-500 dark:border-neutral-700 dark:placeholder:text-neutral-500 dark:focus:border-neutral-400"
            />
            <Dropdown
              multiple
              placeholder="Industries"
              value={industryFilters}
              options={industries}
              onChange={setIndustryFilters}
            />
            <Dropdown
              multiple
              placeholder="Locations"
              value={locationFilters}
              options={locations}
              onChange={setLocationFilters}
            />
            <span className="ml-auto text-sm text-neutral-500 dark:text-neutral-400">
              {filteredCompanies.length} companies
            </span>
          </div>
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-1.5">
              {industryFilters.map((industry) => (
                <button
                  key={`ind-${industry}`}
                  type="button"
                  onClick={() => removeIndustry(industry)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
                >
                  {industry}
                  <span className="text-neutral-400 dark:text-neutral-500">&times;</span>
                </button>
              ))}
              {locationFilters.map((location) => (
                <button
                  key={`loc-${location}`}
                  type="button"
                  onClick={() => removeLocation(location)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
                >
                  {location}
                  <span className="text-neutral-400 dark:text-neutral-500">&times;</span>
                </button>
              ))}
              <button
                type="button"
                onClick={clearAllFilters}
                className="cursor-pointer px-1.5 py-0.5 text-xs text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-4xl rounded-lg bg-[var(--background)]/30 backdrop-blur-xl px-4 py-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-sm font-medium uppercase tracking-wider text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                <th
                  className="cursor-pointer px-3 py-2 select-none"
                  onClick={() => handleSort("Company")}
                >
                  Company{sortIndicator("Company")}
                </th>
                <th
                  className="cursor-pointer px-3 py-2 select-none"
                  onClick={() => handleSort("Industry")}
                >
                  Industry{sortIndicator("Industry")}
                </th>
                <th
                  className="cursor-pointer px-3 py-2 select-none"
                  onClick={() => handleSort("Location")}
                >
                  Location{sortIndicator("Location")}
                </th>
                <th
                  className="cursor-pointer px-3 py-2 text-right select-none"
                  onClick={() => handleSort("Employees")}
                >
                  Employees{sortIndicator("Employees")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr
                  key={company.Company}
                  className="border-b border-neutral-100 transition-colors hover:bg-neutral-50 dark:border-neutral-800/50 dark:hover:bg-neutral-900"
                >
                  <td className="px-3 py-2 font-medium">
                    {company.Website ? (
                      <a
                        href={company.Website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-500 dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
                      >
                        {company.Company}
                      </a>
                    ) : (
                      company.Company
                    )}
                  </td>
                  <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                    {company.Industry?.join(", ")}
                  </td>
                  <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                    {company.Location?.join(", ")}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-neutral-600 dark:text-neutral-400">
                    {company.Employees ? `~ ${company.Employees}` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCompanies.length === 0 && companies.length > 0 && (
          <p className="py-12 text-center text-neutral-400">
            No companies match the current filters.
          </p>
        )}
      </main>
    </div>
  );
}
