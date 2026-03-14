"use client";

import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "../components/dropdown";

interface Community {
  Community: string;
  Description?: string;
  Topic?: string[];
  Platform?: string;
  Join?: string;
}

type SortKey = "Community" | "Platform" | "Topic";

export default function Communities() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [search, setSearch] = useState("");
  const [topicFilters, setTopicFilters] = useState<string[]>([]);
  const [platformFilters, setPlatformFilters] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("Community");
  const [sortAsc, setSortAsc] = useState(true);
  useEffect(() => {
    fetch("/data/communities.json")
      .then((res) => res.json())
      .then((data) => setCommunities(data.communities ?? []));
  }, []);

  const topics = useMemo(() => {
    const set = new Set<string>();
    communities.forEach((c) => c.Topic?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [communities]);

  const platforms = useMemo(() => {
    const set = new Set<string>();
    communities.forEach((c) => {
      if (c.Platform) set.add(c.Platform);
    });
    return Array.from(set).sort();
  }, [communities]);

  const filteredCommunities = useMemo(() => {
    const query = search.toLowerCase();
    return communities
      .filter((community) => {
        if (query && !community.Community.toLowerCase().includes(query))
          return false;
        if (
          topicFilters.length > 0 &&
          !community.Topic?.some((t) => topicFilters.includes(t))
        )
          return false;
        if (
          platformFilters.length > 0 &&
          !platformFilters.includes(community.Platform ?? "")
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        const direction = sortAsc ? 1 : -1;
        if (sortKey === "Platform") {
          return (
            (a.Platform ?? "").localeCompare(b.Platform ?? "") * direction
          );
        }
        if (sortKey === "Topic") {
          return (
            (a.Topic?.[0] ?? "").localeCompare(b.Topic?.[0] ?? "") * direction
          );
        }
        return a.Community.localeCompare(b.Community) * direction;
      });
  }, [communities, search, topicFilters, platformFilters, sortKey, sortAsc]);

  const hasActiveFilters = topicFilters.length > 0 || platformFilters.length > 0;

  function removeTopic(topic: string) {
    setTopicFilters((prev) => prev.filter((t) => t !== topic));
  }

  function removePlatform(platform: string) {
    setPlatformFilters((prev) => prev.filter((p) => p !== platform));
  }

  function clearAllFilters() {
    setTopicFilters([]);
    setPlatformFilters([]);
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
      <header className="sticky top-0 z-10 border-b border-neutral-200 backdrop-blur-xl dark:border-neutral-800 mb-4">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                IT Croatia
              </h1>
              <h2 className="text-md text-neutral-500 dark:text-neutral-400 mt-1">
                IT communities in Croatia across various platforms and topics.
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
              placeholder="Topics"
              value={topicFilters}
              options={topics}
              onChange={setTopicFilters}
            />
            <Dropdown
              multiple
              placeholder="Platforms"
              value={platformFilters}
              options={platforms}
              onChange={setPlatformFilters}
            />
            <span className="ml-auto text-sm text-neutral-500 dark:text-neutral-400">
              {filteredCommunities.length} communities
            </span>
          </div>
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-1.5">
              {topicFilters.map((topic) => (
                <button
                  key={`topic-${topic}`}
                  type="button"
                  onClick={() => removeTopic(topic)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
                >
                  {topic}
                  <span className="text-neutral-400 dark:text-neutral-500">&times;</span>
                </button>
              ))}
              {platformFilters.map((platform) => (
                <button
                  key={`plat-${platform}`}
                  type="button"
                  onClick={() => removePlatform(platform)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
                >
                  {platform}
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

      <main className="mx-auto max-w-4xl rounded-lg bg-[var(--background)] px-4 py-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                <th
                  className="cursor-pointer px-3 py-2 select-none"
                  onClick={() => handleSort("Community")}
                >
                  Community{sortIndicator("Community")}
                </th>
                <th
                  className="cursor-pointer px-3 py-2 select-none"
                  onClick={() => handleSort("Topic")}
                >
                  Topic{sortIndicator("Topic")}
                </th>
                <th
                  className="cursor-pointer px-3 py-2 select-none"
                  onClick={() => handleSort("Platform")}
                >
                  Platform{sortIndicator("Platform")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCommunities.map((community) => (
                <tr
                  key={community.Community}
                  className="border-b border-neutral-100 transition-colors hover:bg-neutral-50 dark:border-neutral-800/50 dark:hover:bg-neutral-900"
                >
                  <td className="px-3 py-2 font-medium">
                    {community.Join ? (
                      <a
                        href={community.Join}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-500 dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
                      >
                        {community.Community}
                      </a>
                    ) : (
                      community.Community
                    )}
                  </td>
                  <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                    {community.Topic?.join(", ")}
                  </td>
                  <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                    {community.Platform}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCommunities.length === 0 && communities.length > 0 && (
          <p className="py-12 text-center text-neutral-400">
            No communities match the current filters.
          </p>
        )}
      </main>
    </div>
  );
}
