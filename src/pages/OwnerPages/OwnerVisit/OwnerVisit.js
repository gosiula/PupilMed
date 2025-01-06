import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import OwnerHeader from "../../../components/OwnerHeader/OwnerHeader";
import BackArrow from "../../../components/BackArrow/BackArrow";
import { visit_info } from "../../../data/visit_info";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "./OwnerVisit.css";

// // ustawienia do mapy
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

const OwnerVisit = () => {
  const location = useLocation();

  const { visitDate, visitHour } = location.state || {};

  //   const [coordinates, setCoordinates] = useState({
  //     lat: 52.2297,
  //     lng: 21.0122,
  //   });
  //   const [isMapReady, setIsMapReady] = useState(false);

  //   // pobieranie koordynatów na podstawie adresu
  //   useEffect(() => {
  //     const geocodeAddress = async (address) => {
  //       const encodedAddress = encodeURIComponent(address);
  //       const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;

  //       try {
  //         const response = await fetch(url, {
  //           headers: {
  //             "User-Agent": "PupilMed/1.0 (your-email@example.com)",
  //           },
  //         });

  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }

  //         const data = await response.json();

  //         if (data && data.length > 0) {
  //           const lat = parseFloat(data[0].lat);
  //           const lng = parseFloat(data[0].lon);

  //           if (!isNaN(lat) && !isNaN(lng)) {
  //             setCoordinates({ lat, lng });
  //             setIsMapReady(true);
  //             console.log("Geocoding successful:", { lat, lng });
  //           } else {
  //             console.error("Invalid coordinates received.");
  //             setIsMapReady(false);
  //           }
  //         } else {
  //           console.error("No geolocation data found for the given address.");
  //           setIsMapReady(false);
  //         }
  //       } catch (error) {
  //         console.error("Error during geocoding:", error);
  //         setIsMapReady(false);
  //       }
  //     };

  //     // wywołanie funkcji geokodowania na podstawie adresu kliniki
  //     geocodeAddress(visit_info.adres_kliniki);
  //   }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <OwnerHeader />
      <BackArrow title={`Wizyta ${visitDate}`} />

      <div className="info-container">
        <div className="visit-info">
          <p className="visit-date-info2">Informacje o wizycie:</p>
          <p>
            <strong>Godzina:</strong> {visitHour}
          </p>
          <p>
            <strong>Typ wizyty:</strong> {visit_info.typ_wizyty}
          </p>
          <p>
            <strong>Właściciel:</strong> {visit_info.wlasciciel}
          </p>
          <p>
            <strong>Numer właściciela:</strong>{" "}
            {visit_info.numer_telefonu_wlasciciela}
          </p>
          <p>
            <strong>Numer weterynarza:</strong>{" "}
            {visit_info.numer_telefonu_weterynarza}
          </p>
          <p>
            <strong>Cena:</strong> {visit_info.cena} zł
          </p>
          <p>
            <strong>Zwierzę:</strong> {visit_info.typ_zwierzecia}{" "}
            {visit_info.imie_zwierzecia}
          </p>
          <p>
            <strong>Rasa:</strong> {visit_info.rasa}
          </p>
          <p>
            <strong>Wiek:</strong> {visit_info.wiek}
          </p>
        </div>
        {/* <Suspense fallback={<div>Loading map...</div>}>
          {isMapReady && (
            <MapContainer
              center={[coordinates.lat, coordinates.lng]}
              zoom={15}
              style={{ height: "350px", width: "90%", marginBottom: "20px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[coordinates.lat, coordinates.lng]}>
                <Popup>Adres kliniki: {visit_info.adres_kliniki}</Popup>
              </Marker>
            </MapContainer>
          )}
        </Suspense> */}
      </div>
    </div>
  );
};

export default OwnerVisit;
