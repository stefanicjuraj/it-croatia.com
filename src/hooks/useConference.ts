import { useEffect, useState } from "react";
// Types
import Conference from "../types/conference";

export const useConference = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await fetch("/data/conferences.json");
        if (!response.ok) {
          throw new Error("Error fetching data.");
        }
        const data = await response.json();
        setConferences(data.conferences);
      } catch (error) {
        setError("Error fetching data: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  const countdown = (startDate: string) => {
    const now = new Date();
    let currentYear = now.getFullYear();
    let fullStartDate = `${startDate}, ${currentYear}`;
    let start = new Date(fullStartDate);

    if (start.getTime() < now.getTime()) {
      currentYear += 1;
      fullStartDate = `${startDate}, ${currentYear}`;
      start = new Date(fullStartDate);
    }

    const difference = start.getTime() - now.getTime();
    const daysLeft = Math.ceil(difference / (1000 * 3600 * 24));

    return daysLeft > 0 ? `${daysLeft} days` : "";
  };

  return {
    conferences,
    loading,
    error,
    countdown,
  };
};
