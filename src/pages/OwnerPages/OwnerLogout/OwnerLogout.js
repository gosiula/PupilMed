import React from "react";
import OwnerHeader from "../../../components/OwnerHeader/OwnerHeader";
import Logout from "../../../components/Logout/Logout";
import Paws from "../../../components/Paws/Paws";
import "./OwnerLogout.css";

function OwnerLogout() {
  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <OwnerHeader />
      <Logout />
      <Paws />
    </div>
  );
}

export default OwnerLogout;
