# it-croatia.com - Agent Reference

You are working with the it-croatia.com API: a public dataset of IT companies, startups, agencies, and consultancies in Croatia.

This document tells you everything you need to fetch, filter, and use this data in applications you build.

## Quick Start

To get all companies as JSON, make a single GET request:

    fetch("https://www.it-croatia.com/api/companies?format=json")

To filter, add query parameters:

    fetch("https://www.it-croatia.com/api/companies?format=json&industry=software&location=zagreb")

From a terminal:

    curl -sL -H "Accept: application/json" "https://www.it-croatia.com/api/companies"

That is all you need. The rest of this document covers details.

## API

Single endpoint: GET https://www.it-croatia.com/api/companies

### Getting JSON

The API uses content negotiation. You get JSON by doing one of:
- Adding ?format=json to the URL (simplest, recommended for fetch/axios)
- Setting the Accept: application/json header

Without either, the response is a plain-text ASCII table (useful for terminal output).

### Query Parameters

- industry (string, optional): filter by industry. Must be one of the values listed below. Case-insensitive.
- location (string, optional): filter by location slug. Must be one of the values listed below. ASCII-normalized (no diacritics, hyphens for spaces).
- format (string, optional): set to "json" to force JSON output.

Both filters can be combined. Omitting both returns all companies.

### Response Shape

```json
{
  "count": 207,
  "filters": { "industry": "software", "location": "zagreb" },
  "companies": [
    {
      "company": "Example d.o.o.",
      "industry": ["software"],
      "location": ["Zagreb"],
      "employees": "50"
    }
  ]
}
```

- count: number of companies in the response
- filters: the filters you applied, echoed back
- companies: array of company objects
- company: name (string)
- industry: array of strings, a company can belong to multiple industries
- location: array of strings, a company can have multiple office locations
- employees: approximate headcount as a string

### Error Handling

If you pass an invalid industry or location, the API returns 400 with:

```json
{ "error": "Unknown industry: \"fintech\". Available: blockchain, cybersecurity, ..." }
```

The error message lists all valid values. Parse it or use the valid values listed below.

### CORS

The API sets Access-Control-Allow-Origin: * so you can call it from any browser-based application without proxy workarounds.

### No Authentication

The API is fully public. No API keys, tokens, or authentication needed.

### No Pagination

The API returns all matching results in a single response. There is no pagination, cursors, or offsets. The full dataset is roughly 800 companies.

## Valid Filter Values

### Industries (11 values)

blockchain, cybersecurity, design, finance, game development, information technology, marketing, media, services/consulting, software, telecommunications

### Locations (63 values)

belisce, bjelovar, cakovec, cavle, ciovo, dakovo, dubrovnik, dugopolje, durdevac, gradac, karlovac, kastav, korcula, kraljevica, krapina, krk, kutina, labin, lipik, lucko, ludbreg, matulji, metkovic, nedelisce, novigrad, osijek, pazin, porec, pozega, pregrada, pribislavec, pula, punat, rabac, remote, rijeka, samobor, savudrija, sibenik, sibinj, sisak, slavonski-brod, solin, split, sv-nedjelja, trogir, valpovo, varazdin, velika-gorica, vinkovci, virje, virovitica, vis, vizinada, vodnjan, vrbanja, vrbovec, vrpolje, vukovar, zabok, zadar, zagreb, zapresic

Location slugs use ASCII characters only. "Čakovec" becomes "cakovec", "Slavonski Brod" becomes "slavonski-brod", "Sv. Nedjelja" becomes "sv-nedjelja".

## CLI Usage

For terminal-based workflows (scripts, pipelines, shell tools), use curl directly:

    curl -sL it-croatia.com                        # all companies, text table
    curl -sL it-croatia.com/software               # filter by industry
    curl -sL it-croatia.com/zagreb                  # filter by location
    curl -sL it-croatia.com/software/zagreb         # combine filters

For JSON output from the terminal:

    curl -sL -H "Accept: application/json" "https://www.it-croatia.com/api/companies"
    curl -sL -H "Accept: application/json" "https://www.it-croatia.com/api/companies?industry=software&location=zagreb"

Pipe to jq for extraction:

    curl -sL -H "Accept: application/json" "https://www.it-croatia.com/api/companies?location=split" | jq '.companies[].company'

## Guidance for Building Applications

- Fetch once, filter client-side: the full dataset is small (~800 companies). For apps that need multiple views or filters, fetch all data once and filter in memory rather than making repeated API calls.
- The employees field is a string, not a number. Parse it with parseInt() or equivalent if you need numeric comparisons.
- A company can have multiple industries and multiple locations. Use array methods (.includes, .some, .filter) when matching.
- Location values in the response use the original Croatian names with diacritics (e.g. "Čakovec", "Zaprešić"). The query parameter uses the ASCII slug form (e.g. "cakovec", "zapresic").
- Industry values in the response are capitalized (e.g. "Software", "Game Development"). The query parameter uses lowercase (e.g. "software", "game development").
- The dataset covers Croatia only. Do not assume international coverage.
- Data is updated monthly. Do not cache indefinitely if freshness matters.

## OpenAPI Specification

The full OpenAPI 3.1 spec is available at:

    https://www.it-croatia.com/openapi.yaml

Use it for code generation, schema validation, or integration with tools that consume OpenAPI.
