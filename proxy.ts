import { NextRequest, NextResponse } from "next/server";

const INDUSTRIES = new Set([
  "blockchain",
  "cybersecurity",
  "design",
  "finance",
  "game-development",
  "information-technology",
  "marketing",
  "media",
  "services-consulting",
  "software",
  "telecommunications",
]);

const LOCATIONS = new Set([
  "belisce", "bjelovar", "dubrovnik", "dugopolje", "gradac",
  "karlovac", "kastav", "korcula", "kraljevica", "krapina",
  "krk", "kutina", "labin", "lipik", "ludbreg", "lucko",
  "matulji", "metkovic", "nedelisce", "novigrad", "osijek",
  "pazin", "porec", "pozega", "pregrada", "pribislavec",
  "pula", "punat", "rabac", "remote", "rijeka", "samobor",
  "savudrija", "sibinj", "sisak", "slavonski-brod", "solin",
  "split", "sv-nedjelja", "trogir", "valpovo", "varazdin",
  "velika-gorica", "vinkovci", "virje", "virovitica", "vis",
  "vizinada", "vodnjan", "vrbanja", "vrbovec", "vrpolje",
  "vukovar", "zabok", "zadar", "zagreb", "zapresic",
  "cakovec", "cavle", "ciovo", "dakovo", "durdevac", "sibenik",
]);

function toIndustryValue(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace("services consulting", "services/consulting");
}

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const isBrowser = accept.includes("text/html");

  if (isBrowser) {
    return NextResponse.next();
  }

  const segments = request.nextUrl.pathname
    .slice(1)
    .toLowerCase()
    .split("/")
    .filter(Boolean);

  const headers = new Headers(request.headers);

  for (const seg of segments) {
    if (INDUSTRIES.has(seg)) {
      headers.set("x-filter-industry", toIndustryValue(seg));
    } else if (LOCATIONS.has(seg)) {
      headers.set("x-filter-location", seg);
    }
  }

  return NextResponse.rewrite(new URL("/api/companies", request.url), {
    request: { headers },
  });
}

export const config = {
  matcher: ["/((?!api|_next|communities|favicon\\.ico|icon\\.svg|logo\\.svg|data|assets).*)"],
};
