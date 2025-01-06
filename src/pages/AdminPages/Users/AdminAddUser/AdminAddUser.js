import React from "react";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import UserForm from "../../../../components/UserForm/UserForm";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminAddUser.css";

const AdminAddUser = () => {
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

  return (
    <div className="admin-add-animal">
      <AdminHeader />
      <BackArrow title="Dodawanie użytkownika" />
      <UserForm
        fields={fields}
        fieldLabels={fieldLabels}
        fieldErrors={fieldErrors}
        savedForm={null}
        buttonText="Dodaj użytkownika"
        navigateTo={`/admin/users/add-user/confirm`}
        type="add"
      />
    </div>
  );
};

export default AdminAddUser;
