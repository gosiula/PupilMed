import React from "react";
import { useLocation } from "react-router-dom";
import "./AdminSuccess.css";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import Success from "../../../components/Success/Success";

function AdminSuccess() {
  const location = useLocation();

  const message = location.state?.message || {};
  const navigateTo = location.state?.navigateTo || {};

  return (
    <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
      <AdminHeader />
      <Success navigateTo={navigateTo} message={message} />
    </div>
  );
}

export default AdminSuccess;
