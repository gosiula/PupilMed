import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import AdminRoutes from "./routes/AdminRoutes";
import VetRoutes from "./routes/VetRoutes";
import OwnerRoutes from "./routes/OwnerRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/error" element={<ErrorPage />} />
    <Route
      path="/admin/*"
      element={
        <ProtectedRoute requiredRole="ADMIN">
          <AdminRoutes />
        </ProtectedRoute>
      }
    />
    <Route
      path="/vet/*"
      element={
        <ProtectedRoute requiredRole="VET">
          <VetRoutes />
        </ProtectedRoute>
      }
    />
    <Route
      path="/owner/*"
      element={
        <ProtectedRoute requiredRole="OWNER">
          <OwnerRoutes />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default App;
