import React from "react";
import OwnerHeader from "../../../../components/OwnerHeader/OwnerHeader";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import ChangePasswordForm from "../../../../components/ChangePasswordForm/ChangePasswordForm";
import "./OwnerChangePassword.css";

function OwnerChangePassword() {
  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <OwnerHeader />
      <BackArrow title="Zmiana hasła" />
      <ChangePasswordForm
        navigateTo={"/owner/account/change_password/confirm"}
      />
    </div>
  );
}

export default OwnerChangePassword;
