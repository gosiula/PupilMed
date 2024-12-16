import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { GiMedicines } from "react-icons/gi";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { IoPaw } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Owner.css";
import "../OwnerAndVet.css";

// ustawienia do mapy
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// przykładowe wizyyt
const visit_info = {
  godzina: "13:00",
  typ: "kontrola",
  lekarz: "Maria Nowak",
  numer_lekarza: "123456789",
  cena: "250 zł",
  nazwa_kliniki: "Pupilkowo",
  adres_kliniki: "Sienkiewicza 1, Wrocław", // nazwa ważna! - bez ul. przed nazwą ulicy - inaczej nie działa geolokalizacja
};

function OwnerVisit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { visitDate } = location.state || {};

  const [coordinates, setCoordinates] = useState({
    lat: 52.2297,
    lng: 21.0122,
  });
  const [isMapReady, setIsMapReady] = useState(false);

  // pobieranie koordynatów na podstawie adresu
  useEffect(() => {
    const geocodeAddress = async (address) => {
      const encodedAddress = encodeURIComponent(address);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;

      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "PupilMed/1.0 (your-email@example.com)",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);

          if (!isNaN(lat) && !isNaN(lng)) {
            setCoordinates({ lat, lng });
            setIsMapReady(true);
            console.log("Geocoding successful:", { lat, lng });
          } else {
            console.error("Invalid coordinates received.");
            setIsMapReady(false);
          }
        } else {
          console.error("No geolocation data found for the given address.");
          setIsMapReady(false);
        }
      } catch (error) {
        console.error("Error during geocoding:", error);
        setIsMapReady(false);
      }
    };

    // wywołanie funkcji geokodowania na podstawie adresu kliniki
    geocodeAddress(visit_info.adres_kliniki);
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <div className="owner-header">
        <button className="current-button" onClick={() => navigate("/owner")}>
          <LuCalendarCheck className="owner-icon" />
          Wizyty
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/ownerrecommendations")}
        >
          <GiMedicines className="owner-icon" />
          Zalecenia
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/owneraccount")}
        >
          <MdAccountCircle className="owner-icon" />
          Konto
        </button>
        <button
          className="owner-button"
          onClick={() => navigate("/ownerlogout")}
        >
          <MdLogout className="owner-icon" />
          Wyloguj
        </button>
        <div className="logo-container">
          <p className="logo-text">PupilMed</p>
          <div className="heart-with-paw">
            <GoHeartFill className="heart-icon" />
            <IoPaw className="paw-icon" />
          </div>
        </div>
      </div>

      <p className="visit-date-info">Wizyta {visitDate}</p>
      <div className="visit-container">
        <div className="visit-info">
          <p className="visit-date-info2">Informacje o wizycie:</p>
          <p>
            <strong>Godzina:</strong> {visit_info.godzina}
          </p>
          <p>
            <strong>Typ wizyty:</strong> {visit_info.typ}
          </p>
          <p>
            <strong>Lekarz:</strong> {visit_info.lekarz}
          </p>
          <p>
            <strong>Numer lekarza:</strong> {visit_info.numer_lekarza}
          </p>
          <p>
            <strong>Cena:</strong> {visit_info.cena}
          </p>
          <p>
            <strong>Nazwa kliniki:</strong> {visit_info.nazwa_kliniki}
          </p>
          <p>
            <strong>Adres kliniki:</strong> ul. {visit_info.adres_kliniki}
          </p>
        </div>

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
            {coordinates && (
              <Marker position={[coordinates.lat, coordinates.lng]}>
                <Popup>Adres kliniki: {visit_info.adres_kliniki}</Popup>
              </Marker>
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
}

export default OwnerVisit;
