import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import AdminRoutes from "./routes/AdminRoutes";
import VetRoutes from "./routes/VetRoutes";
import OwnerRoutes from "./routes/OwnerRoutes";

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin/*" element={<AdminRoutes />} />
    <Route path="/vet/*" element={<VetRoutes />} />
    <Route path="/owner/*" element={<OwnerRoutes />} />
  </Routes>
);

export default App;
