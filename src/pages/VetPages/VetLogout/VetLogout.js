import React from "react";
import VetHeader from "../../../components/VetHeader/VetHeader";
import Logout from "../../../components/Logout/Logout";
import Paws from "../../../components/Paws/Paws";
import "./VetLogout.css";

function VetLogout() {
  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <VetHeader />
      <Logout />
      <Paws />
    </div>
  );
}

export default VetLogout;
