import React from "react";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import Logout from "../../../components/Logout/Logout";
import Paws from "../../../components/Paws/Paws";
import "./AdminLogout.css";

function AdminLogout() {
  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <AdminHeader />
      <Logout />
      <Paws />
    </div>
  );
}

export default AdminLogout;
