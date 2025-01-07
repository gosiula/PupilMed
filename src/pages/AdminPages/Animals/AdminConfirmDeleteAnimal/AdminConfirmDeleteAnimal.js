import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminConfirmDeleteAnimal.css";

const AdminConfirmDeleteAnimal = () => {
  const navigate = useNavigate();

  const { animalInfo } = useParams();

  const [phoneNumber, animalName] = animalInfo
    ? animalInfo.split("_")
    : ["", ""];

  const handleConfirm = () => {
    // localStorage.clear();
    navigate("/admin/success", {
      state: {
        message: "Sukces! Zwierzę zostało usunięte!",
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
        title={`Czy na pewno chcesz usunąć zwierzę o imieniu ${animalName} należące do użytkownika o numerze telefonu ${phoneNumber}?`}
      />
    </div>
  );
};

export default AdminConfirmDeleteAnimal;
