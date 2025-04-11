import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Types
import Company from "../types/company";

const DefaultIcon = L.icon({
  iconUrl: "/assets/icons/pin-filled.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const cityCoordinates: { [key: string]: [number, number] } = {
  Zagreb: [45.815, 15.982],
  Split: [43.508, 16.44],
  Rijeka: [45.327, 14.442],
  Osijek: [45.551, 18.694],
  Zadar: [44.119, 15.232],
  Pula: [44.866, 13.849],
  Varaždin: [46.305, 16.337],
  Dubrovnik: [42.65, 18.094],
  "Slavonski Brod": [45.16, 18.015],
  Karlovac: [45.493, 15.555],
  Samobor: [45.801, 15.711],
  "Velika Gorica": [45.714, 16.075],
  Bjelovar: [45.899, 16.842],
  Sisak: [45.485, 16.373],
  Vinkovci: [45.288, 18.805],
  Koprivnica: [46.163, 16.833],
  Vukovar: [45.353, 19.001],
  Čakovec: [46.384, 16.434],
  Požega: [45.332, 17.674],
  Virovitica: [45.832, 17.384],
  Križevci: [46.022, 16.542],
  Makarska: [43.294, 17.019],
  Rovinj: [45.081, 13.638],
  Metković: [43.054, 17.648],
  Sinj: [43.702, 16.637],
  Knin: [44.04, 16.196],
  Solin: [43.539, 16.493],
  Đakovo: [45.309, 18.41],
  Opatija: [45.338, 14.305],
  Umag: [45.437, 13.526],
  Labin: [45.086, 14.122],
  Kutina: [45.479, 16.776],
  Pazin: [45.24, 13.937],
  Imotski: [43.444, 17.217],
  "Novi Marof": [46.166, 16.339],
  Ogulin: [45.266, 15.233],
  Našice: [45.494, 18.095],
  Omiš: [43.444, 16.692],
  Poreč: [45.227, 13.594],
  Trogir: [43.516, 16.25],
  Vodice: [43.759, 15.778],
  Gospić: [44.546, 15.374],
  Krapina: [46.16, 15.879],
  Daruvar: [45.594, 17.224],
  Crikvenica: [45.174, 14.693],
  "Ivanić-Grad": [45.708, 16.396],
  Novska: [45.34, 16.977],
  "Nova Gradiška": [45.259, 17.383],
  "Biograd na Moru": [43.937, 15.444],
  Petrinja: [45.437, 16.29],
  Garešnica: [45.574, 16.941],
};

type MapStyle = {
  url: string;
  attribution: string;
  maxZoom: number;
};

type MapStyles = {
  dark: MapStyle;
  light: MapStyle;
  terrain: MapStyle;
  satellite: MapStyle;
  standard: MapStyle;
};

const mapStyles: MapStyles = {
  dark: {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    attribution: '<a href="https://stadiamaps.com/"></a>',
    maxZoom: 20,
  },
  light: {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    attribution: '<a href="https://stadiamaps.com/"></a>',
    maxZoom: 20,
  },
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: '<a href="https://opentopomap.org"></a>',
    maxZoom: 17,
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '<a href="https://www.esri.com/"></a>',
    maxZoom: 19,
  },
  standard: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '<a href="https://www.openstreetmap.org/copyright"></a>',
    maxZoom: 19,
  },
};

const MapStyleControl = ({
  mapStyle,
  setMapStyle,
}: {
  mapStyle: keyof MapStyles;
  setMapStyle: (style: keyof MapStyles) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    const StyleControl = L.Control.extend({
      options: {
        position: "topright",
      },
      onAdd: function () {
        const div = L.DomUtil.create("div", "leaflet-control leaflet-bar");
        div.innerHTML = `
          <select
            id="style-selector"
            class="bg-[#444] text-white px-4 py-2 rounded-md border border-[#555] focus:outline-none focus:border-blue-500"
            style="padding: 8px; margin: 6px; cursor: pointer; font-size: 16px; min-width: 150px;"
          >
            <option value="dark" ${
              mapStyle === "dark" ? "selected" : ""
            }>Dark</option>
            <option value="light" ${
              mapStyle === "light" ? "selected" : ""
            }>Light</option>
            <option value="terrain" ${
              mapStyle === "terrain" ? "selected" : ""
            }>Terrain Relief</option>
            <option value="satellite" ${
              mapStyle === "satellite" ? "selected" : ""
            }>Satellite</option>
            <option value="standard" ${
              mapStyle === "standard" ? "selected" : ""
            }>Standard</option>
          </select>
        `;

        L.DomEvent.disableClickPropagation(div);

        const select = div.querySelector("select");
        if (select) {
          select.addEventListener("change", (e) => {
            const target = e.target as HTMLSelectElement;
            setMapStyle(target.value as keyof MapStyles);
          });
        }

        return div;
      },
    });

    const styleControl = new StyleControl();
    styleControl.addTo(map);

    return () => {
      styleControl.remove();
    };
  }, [map, mapStyle, setMapStyle]);

  return null;
};

interface MapProps {
  companiesByCity: { [city: string]: Company[] };
}

export default function Map({ companiesByCity }: MapProps) {
  const [mapStyle, setMapStyle] = useState<keyof MapStyles>("dark");

  useEffect(() => {
    // Add custom styles for the Leaflet popups
    const style = document.createElement("style");
    style.textContent = `
      .leaflet-popup-content-wrapper {
        background: #222;
        color: #fff;
        border-radius: 8px;
        padding: 0;
        box-shadow: 0 3px 14px rgba(0,0,0,0.4);
      }
      .leaflet-popup-content {
        margin: 0;
        padding: 0;
        width: 260px !important;
      }
      .leaflet-popup-tip {
        background: #222;
      }
      .company-popup {
        padding: 12px;
      }
      .company-list {
        margin-top: 8px;
        border-top: 1px solid #444;
      }
      .company-item {
        padding: 8px 12px;
        border-bottom: 1px solid #444;
        transition: all 0.2s ease;
      }
      .company-item:hover {
        background: #333;
      }
      .company-count {
        display: inline-block;
        background: #1a1a1a;
        border-radius: 12px;
        padding: 2px 8px;
        font-size: 12px;
        margin-left: 8px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleCompanyClick = (company: Company) => {
    window.open(company.Website, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {Object.keys(cityCoordinates).length > 0 && (
        <MapContainer
          center={[45.1, 16.5]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution={mapStyles[mapStyle].attribution}
            url={mapStyles[mapStyle].url}
            maxZoom={mapStyles[mapStyle].maxZoom}
          />
          <MapStyleControl mapStyle={mapStyle} setMapStyle={setMapStyle} />

          {Object.entries(companiesByCity).map(([city, companies]) => {
            const coordinates = cityCoordinates[city];
            if (!coordinates) return null;

            return (
              <Marker key={city} position={coordinates}>
                <Popup>
                  <div className="company-popup">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-white">{city}</h3>
                      <span className="company-count bg-indigo-900 text-indigo-200">
                        {companies.length}
                      </span>
                    </div>
                    <div
                      className="company-list max-h-64 overflow-y-auto scrollbar-hide"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      <style>{`
                        div::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      {companies.map((company) => (
                        <div
                          key={company.Company}
                          className="company-item cursor-pointer hover:text-indigo-300 text-gray-200"
                          onClick={() => handleCompanyClick(company)}
                        >
                          {company.Company}
                        </div>
                      ))}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </>
  );
}
