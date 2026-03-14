# [it-croatia.com](https://it-croatia.com)

Collection of IT companies, startups, agencies, and consultancies in Croatia 🇭🇷

All data collected is sourced from publicly available information and sources on the internet, whilst not being affiliated with any of the listed entities.

To ensure accuracy and relevancy, regular updates are conducted on a monthly basis. This involves the addition of newly established entities while removing inactive or defunct entities from the collection.

## CLI

Access the data directly from your terminal:

```bash
curl -sL it-croatia.com
```

### Filter by industry

```bash
curl -sL it-croatia.com/software
```

### Filter by location

```bash
curl -sL it-croatia.com/zagreb
```

### Combine filters

```bash
curl -sL it-croatia.com/software/zagreb
```

## API Reference

Base URL: `https://www.it-croatia.com/api`

### `GET /api/companies`

Returns a list of all companies.

#### Query Parameters

| Parameter  | Type     | Required | Description                        |
| ---------- | -------- | -------- | ---------------------------------- |
| `industry` | `string` | No       | Filter by industry (e.g. software) |
| `location` | `string` | No       | Filter by location (e.g. zagreb)   |

#### Request

```bash
curl -H "Accept: application/json" "https://www.it-croatia.com/api/companies"
```

#### Response `200 OK`

```json
{
  "count": 800,
  "filters": {},
  "companies": [
    {
      "company": "Example",
      "industry": ["software"],
      "location": ["Zagreb"],
      "employees": "50"
    }
  ]
}
```

#### Response Fields

| Field                   | Type       | Description                        |
| ----------------------- | ---------- | ---------------------------------- |
| `count`                 | `number`   | Total number of companies returned |
| `filters`               | `object`   | Applied filters echoed back        |
| `companies`             | `array`    | List of company objects            |
| `companies[].company`   | `string`   | Company name                       |
| `companies[].industry`  | `string[]` | List of industries                 |
| `companies[].location`  | `string[]` | List of locations                  |
| `companies[].employees` | `string`   | Approximate employee count         |

### Examples

#### Filter by industry

```bash
curl -H "Accept: application/json" "https://www.it-croatia.com/api/companies?industry=software"
```

#### Filter by location

```bash
curl -H "Accept: application/json" "https://www.it-croatia.com/api/companies?location=split"
```

#### Combine filters

```bash
curl -H "Accept: application/json" "https://www.it-croatia.com/api/companies?industry=software&location=zagreb"
```

### Available Filter Values

#### Industries

| Value                  | Slug (for CLI)           |
| ---------------------- | ------------------------ |
| blockchain             | `blockchain`             |
| cybersecurity          | `cybersecurity`          |
| design                 | `design`                 |
| finance                | `finance`                |
| game development       | `game-development`       |
| information technology | `information-technology` |
| marketing              | `marketing`              |
| media                  | `media`                  |
| services/consulting    | `services-consulting`    |
| software               | `software`               |
| telecommunications     | `telecommunications`     |

#### Locations

`belisce` `bjelovar` `cakovec` `cavle` `ciovo` `dakovo` `dubrovnik` `dugopolje` `durdevac` `gradac` `karlovac` `kastav` `korcula` `kraljevica` `krapina` `krk` `kutina` `labin` `lipik` `lucko` `ludbreg` `matulji` `metkovic` `nedelisce` `novigrad` `osijek` `pazin` `porec` `pozega` `pregrada` `pribislavec` `pula` `punat` `rabac` `remote` `rijeka` `samobor` `savudrija` `sibenik` `sibinj` `sisak` `slavonski-brod` `solin` `split` `sv-nedjelja` `trogir` `valpovo` `varazdin` `velika-gorica` `vinkovci` `virje` `virovitica` `vis` `vizinada` `vodnjan` `vrbanja` `vrbovec` `vrpolje` `vukovar` `zabok` `zadar` `zagreb` `zapresic`

## Contributing

Contributions from the community are encouraged and welcome to further enhance the collection's value and comprehensiveness, allowing users to suggest additions, updates, and feedback. Collaboration with the community ensures the collection remains a reliable and robust resource about the IT industry in Croatia.
