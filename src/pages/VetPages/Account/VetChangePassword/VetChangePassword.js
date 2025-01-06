import React from "react";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import ChangePasswordForm from "../../../../components/ChangePasswordForm/ChangePasswordForm";
import "./VetChangePassword.css";

function VetChangePassword() {
  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <VetHeader />
      <BackArrow title="Zmiana hasła" />
      <ChangePasswordForm navigateTo={"/vet/account/change_password/confirm"} />
    </div>
  );
}

export default VetChangePassword;
