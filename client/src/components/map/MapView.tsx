import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { SearchPanelProps } from "../../types/models";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function getMarkerIcon(type: string) {
  let color = "#22c55e";
  if (type === "private") color = "#f97316";
  if (type === "international") color = "#ec4899";
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;">
      <svg width="16" height="16" fill="white"><path d="M8 0C5.243 0 3 2.243 3 5c0 3.25 4.5 10.5 4.5 10.5s4.5-7.25 4.5-10.5c0-2.757-2.243-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z"/></svg>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
}


const MapView: React.FC<SearchPanelProps> = ({ onSelectSchool }) => {
  const [schools, setSchools] = useState<
    { id: number; name: string; position: [number, number] ; school_type:string}[]
  >([]);
    useEffect(() => {
    fetch("http://127.0.0.1:8000/school/")
      .then((res) => res.json())
      .then((data) => {
       
        // Convert GeoJSON to [lat, lng] if needed
        const parsed = data.map((school: { id: number; name: string; geom: string;school_type:string }) => ({
          id: school.id,
          name: school.name,
          position: JSON.parse(school.geom).coordinates.reverse(),// [lng, lat] to [lat, lng]
          school_type:school.school_type 
        }));
        console.log(parsed[0])
        setSchools(parsed);
      });
  }, []);

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[10.77636, 106.70109]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {schools.map((school) => (
          <Marker 
            key={school.id} 
            position={school.position as [number, number]}
            icon={getMarkerIcon(school.school_type)}
            eventHandlers={{
              click: () => {
                if(onSelectSchool){
                  onSelectSchool(school.name);
                }
              }
            }}
          >
            <Popup>
              <span className="font-bold">{school.name}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;