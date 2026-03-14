import { NextRequest } from "next/server";
import companiesData from "../../../public/data/companies.json";

interface Company {
  Company: string;
  Industry?: string[];
  Location?: string[];
  Employees?: string;
}

const INDUSTRIES = [
  "blockchain",
  "cybersecurity",
  "design",
  "finance",
  "game development",
  "information technology",
  "marketing",
  "media",
  "services/consulting",
  "software",
  "telecommunications",
] as const;

const LOCATIONS = [
  "Belišće", "Bjelovar", "Dubrovnik", "Dugopolje", "Gradac",
  "Karlovac", "Kastav", "Korčula", "Kraljevica", "Krapina",
  "Krk", "Kutina", "Labin", "Lipik", "Ludbreg", "Lučko",
  "Matulji", "Metković", "Nedelisce", "Novigrad", "Osijek",
  "Pazin", "Poreč", "Požega", "Pregrada", "Pribislavec",
  "Pula", "Punat", "Rabac", "Remote", "Rijeka", "Samobor",
  "Savudrija", "Sibinj", "Sisak", "Slavonski Brod", "Solin",
  "Split", "Sv. Nedjelja", "Trogir", "Valpovo", "Varaždin",
  "Velika Gorica", "Vinkovci", "Virje", "Virovitica", "Vis",
  "Vižinada", "Vodnjan", "Vrbanja", "Vrbovec", "Vrpolje",
  "Vukovar", "Zabok", "Zadar", "Zagreb", "Zaprešić",
  "Čakovec", "Čavle", "Čiovo", "Đakovo", "Đurđevac", "Šibenik",
] as const;

function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[.\s/]+/g, "-");
}

function textResponse(text: string, status = 200) {
  return new Response(text + "\n", {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const industry =
    searchParams.get("industry")?.toLowerCase() ||
    request.headers.get("x-filter-industry") ||
    undefined;
  const location =
    searchParams.get("location")?.toLowerCase() ||
    request.headers.get("x-filter-location") ||
    undefined;

  let companies = companiesData.companies as Company[];

  if (industry) {
    const match = INDUSTRIES.find((i) => i === industry);
    if (!match) {
      return textResponse(
        `Unknown industry: "${industry}"\n\nAvailable industries:\n${INDUSTRIES.map((i) => `  - ${i}`).join("\n")}`,
        400
      );
    }
    companies = companies.filter((c) =>
      c.Industry?.some((i) => i.toLowerCase() === match)
    );
  }

  if (location) {
    const match = LOCATIONS.find((l) => normalize(l) === normalize(location));
    if (!match) {
      return textResponse(
        `Unknown location: "${location}"\n\nAvailable locations:\n${LOCATIONS.map((l) => `  - ${l} (${normalize(l)})`).join("\n")}`,
        400
      );
    }
    companies = companies.filter((c) =>
      c.Location?.some((l) => l === match)
    );
  }

  const rows = companies.map((c) => [
    c.Company,
    (c.Industry ?? []).join(", "),
    (c.Location ?? []).join(", "),
    c.Employees ?? "-",
  ]);

  const headers = ["Company", "Industry", "Location", "Employees"];

  const colWidths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map((r) => r[i].length))
  );

  const pad = (str: string, width: number) => str.padEnd(width);
  const formatRow = (cells: string[]) =>
    cells.map((cell, i) => pad(cell, colWidths[i])).join(" | ");

  const headerLine = formatRow(headers);
  const separator = colWidths.map((w) => "-".repeat(w)).join("-+-");
  const dataLines = rows.map((row) => formatRow(row));

  return textResponse([headerLine, separator, ...dataLines].join("\n"));
}
