import React, { useEffect, useState } from "react";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import InfoSection from "../../../../components/InfoSection/InfoSection";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./VetAccount.css";
import "../../../../App.css";

function VetAccount() {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        setLoading(true);
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;

        if (!token) {
          throw new Error("Token not found");
        }

        const resp = await fetch("http://localhost:8080/vet/account", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!resp.ok) {
          throw new Error(`Failed to fetch visits: ${resp.statusText}`);
        }

        const json = await resp.json();

        setAccount(json);
      } catch (error) {
        console.error("Error fetching visits:", error);
      } finally {
          setLoading(false);
      }
    };

    fetchVisits();
  }, []);


  const vetData = [
    {
      left: {
        header: "Imię i nazwisko",
        value: `${account.name} ${account.surname}`,
      },
      right: { header: "Nazwa kliniki", value: account.clinic_name },
    },
    {
      left: { header: "Numer telefonu", value: account.phone_number },
      right: { header: "Adres kliniki", value: account.clinic_address },
    },
  ];

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <VetHeader />
      <p className="vet-text1">Konto użytkownika</p>
      {loading ? (
        <div className="spinner">
          <AiOutlineLoading3Quarters className="loading-icon" />
        </div>
      ) : (
        <div>
          {vetData.map((section, index) => (
            <InfoSection
              key={index}
              leftData={section.left}
              rightData={section.right}
              buttonText={"Zmień hasło"}
              isButton={index === 0}
              navigateTo={"/vet/account/change_password"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default VetAccount;
