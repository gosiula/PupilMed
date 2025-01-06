import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmAddAnimal.css";

const AdminConfirmAddAnimal = () => {
  const navigate = useNavigate();

  const { animalInfo } = useParams();

  const [phoneNumber, animalName] = animalInfo
    ? animalInfo.split("_")
    : ["", ""];

  const handleConfirm = () => {
    localStorage.clear();
    navigate("/admin/success", {
      state: {
        message: "Sukces! Zwierzę zostało dodane!",
        navigateTo: "/admin/animals",
      },
    });
  };

  return (
    <div>
      <AdminHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz dodać nowe zwierzę ${animalName} dla użytkownika o numerze ${phoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmAddAnimal;
