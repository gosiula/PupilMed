import React from "react";
import { useParams } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import UserForm from "../../../../components/UserForm/UserForm";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import { vet_user } from "../../../../data/vet_user";
import "./AdminModifyUser.css";

const AdminModifyUser = () => {
  const fields = ["imie", "nazwisko", "numer_telefonu"];

  const fieldLabels = {
    imie: "Imię użytkownika",
    nazwisko: "Nazwisko użytkownika",
    numer_telefonu: "Numer telefonu użytkownika",
  };

  const fieldErrors = {
    imie: "imię",
    nazwisko: "nazwisko",
    numer_telefonu: "numer telefonu",
  };

  const { phoneNumber } = useParams();

  return (
    <div className="admin-add-animal">
      <AdminHeader />
      <BackArrow title="Modyfikacja użytkownika" />
      <UserForm
        fields={fields}
        fieldLabels={fieldLabels}
        fieldErrors={fieldErrors}
        savedForm={vet_user}
        buttonText="Modyfikuj użytkownika"
        navigateTo={`/admin/users/user/modify/confirm/${phoneNumber}`}
        type="modify"
      />
    </div>
  );
};

export default AdminModifyUser;
