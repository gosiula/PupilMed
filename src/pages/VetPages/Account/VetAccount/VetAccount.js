import React from "react";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import InfoSection from "../../../../components/InfoSection/InfoSection";
import { vet_user } from "../../../../data/vet_user";
import "./VetAccount.css";

function VetAccount() {
  const vetData = [
    {
      left: {
        header: "Imię i nazwisko",
        value: `${vet_user.imie} ${vet_user.nazwisko}`,
      },
      right: { header: "Nazwa kliniki", value: vet_user.nazwa_kliniki },
    },
    {
      left: { header: "Numer telefonu", value: vet_user.numer_telefonu },
      right: { header: "Adres kliniki", value: vet_user.adres_kliniki },
    },
  ];

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <VetHeader />
      <p className="vet-text1">Konto użytkownika</p>

      {vetData.map((section, index) => (
        <InfoSection
          key={index}
          leftData={section.left}
          rightData={section.right}
          buttonText={"Zmień hasło"}
          isButton={index === 0 ? true : false}
          navigateTo={"/vet/account/change_password"}
        />
      ))}
    </div>
  );
}

export default VetAccount;
