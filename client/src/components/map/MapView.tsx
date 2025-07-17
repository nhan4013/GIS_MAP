import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { SearchPanelProps } from "../../types/models";
import "leaflet/dist/leaflet.css";

const MapView: React.FC<SearchPanelProps> = ({ onSelectSchool }) => {
  const schools = [
    { id: 1, name: "School A", position: [51.505, -0.09] },
    { id: 2, name: "School B", position: [51.51, -0.1] },
  ];

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[51.505, -0.09]}
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