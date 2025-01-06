import React from "react";
import OwnerHeader from "../../../../components/OwnerHeader/OwnerHeader";
import InfoSection from "../../../../components/InfoSection/InfoSection";
import { vet_user } from "../../../../data/vet_user";
import "./OwnerAccount.css";

function OwnerAccount() {
  const vetData = [
    {
      left: {
        header: "Imię i nazwisko",
        value: `${vet_user.imie} ${vet_user.nazwisko}`,
      },
      right: { header: "Numer telefonu", value: vet_user.numer_telefonu },
    },
  ];

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <OwnerHeader />
      <p className="owner-text1">Konto użytkownika</p>

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
  );
}

export default OwnerAccount;
