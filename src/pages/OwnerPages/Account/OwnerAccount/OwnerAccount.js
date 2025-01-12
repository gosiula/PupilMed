import React, { useEffect, useState } from "react";
import OwnerHeader from "../../../../components/OwnerHeader/OwnerHeader";
import InfoSection from "../../../../components/InfoSection/InfoSection";
import "./OwnerAccount.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./OwnerAccount.css";
import "../../../../App.css";

function OwnerAccount() {
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

        const resp = await fetch("http://localhost:8080/owner/account", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!resp.ok) {
          throw new Error(`Failed to fetch account data: ${resp.statusText}`);
        }

        const json = await resp.json();

        setAccount(json);
      } catch (error) {
        console.error("Error fetching account data:", error);
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
        value: `${account?.name} ${account?.surname}`,
      },
      right: { header: "Numer telefonu", value: `${account?.phone_number}` },
    },
  ];

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <OwnerHeader />
      <p className="owner-text1">Konto użytkownika</p>
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
              isButton={index === 0 ? true : false}
              navigateTo={"/owner/account/change_password"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnerAccount;
