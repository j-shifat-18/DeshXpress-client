import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { useEffect, useRef } from "react";

const CoverageMap = ({serviceCenterData, selectedLocation}) => {
  const centerOfBangladesh = [23.685, 90.3563]; // Dhaka
  const mapRef = useRef();

  function MapFlyTo({ location }) {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.flyTo([location.latitude, location.longitude], 12, { animate: true, duration: 1.5 });
      }
    }, [location, map]);
    return null;
  }

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={centerOfBangladesh}
        zoom={7}
        scrollWheelZoom={true}
        className="h-full w-full"
        whenCreated={mapInstance => { mapRef.current = mapInstance; }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectedLocation && <MapFlyTo location={selectedLocation} />}
        {serviceCenterData.map((district, idx) => {
          const isSelected = selectedLocation && district.district === selectedLocation.district;
          return (
            <Marker
              key={idx}
              position={[district.latitude, district.longitude]}
              icon={L.icon({
                iconUrl: isSelected
                  ? "https://cdn-icons-png.flaticon.com/512/684/684908.png"
                  : "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                iconSize: isSelected ? [40, 40] : [30, 30],
                iconAnchor: [15, 30],
              })}
              eventHandlers={isSelected ? {
                add: (e) => {
                  setTimeout(() => {
                    if (e.target && e.target.openPopup) e.target.openPopup();
                  }, 500);
                }
              } : {}}
            >
              <Popup autoPan={true}>
                <div>
                  <h2 className="text-lg font-semibold">{district.district}</h2>
                  <p className="text-sm">Covered Areas:</p>
                  <ul className="list-disc list-inside text-sm">
                    {district.covered_area.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
