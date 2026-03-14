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

function filterCompanies(
  companies: Company[],
  industry: string | undefined,
  location: string | undefined
): { companies: Company[]; error?: { message: string; status: number } } {
  if (industry) {
    const match = INDUSTRIES.find((i) => i === industry);
    if (!match) {
      return {
        companies: [],
        error: {
          message: `Unknown industry: "${industry}". Available: ${INDUSTRIES.join(", ")}`,
          status: 400,
        },
      };
    }
    companies = companies.filter((c) =>
      c.Industry?.some((i) => i.toLowerCase() === match)
    );
  }

  if (location) {
    const match = LOCATIONS.find((l) => normalize(l) === normalize(location));
    if (!match) {
      return {
        companies: [],
        error: {
          message: `Unknown location: "${location}". Available: ${LOCATIONS.map((l) => `${l} (${normalize(l)})`).join(", ")}`,
          status: 400,
        },
      };
    }
    companies = companies.filter((c) =>
      c.Location?.some((l) => l === match)
    );
  }

  return { companies };
}

function getFilters(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return {
    industry:
      searchParams.get("industry")?.toLowerCase() ||
      request.headers.get("x-filter-industry") ||
      undefined,
    location:
      searchParams.get("location")?.toLowerCase() ||
      request.headers.get("x-filter-location") ||
      undefined,
    format: searchParams.get("format") || request.headers.get("x-format") || undefined,
  };
}

function buildTextTable(companies: Company[]) {
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

  return [headerLine, separator, ...dataLines].join("\n");
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, X-Filter-Industry, X-Filter-Location, X-Format",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  const { industry, location, format } = getFilters(request);
  const allCompanies = companiesData.companies as Company[];

  const result = filterCompanies(allCompanies, industry, location);

  const wantsJson = format === "json" ||
    (request.headers.get("accept") ?? "").includes("application/json");

  if (result.error) {
    if (wantsJson) {
      return Response.json(
        { error: result.error.message },
        { status: result.error.status, headers: corsHeaders }
      );
    }
    return new Response(result.error.message + "\n", {
      status: result.error.status,
      headers: { "Content-Type": "text/plain; charset=utf-8", ...corsHeaders },
    });
  }

  if (wantsJson) {
    const data = result.companies.map(({ Company, Industry, Location, Employees }) => ({
      company: Company,
      industry: Industry,
      location: Location,
      employees: Employees,
    }));

    return Response.json({
      count: data.length,
      filters: {
        ...(industry && { industry }),
        ...(location && { location }),
      },
      companies: data,
    }, { headers: corsHeaders });
  }

  return new Response(buildTextTable(result.companies) + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8", ...corsHeaders },
  });
}
