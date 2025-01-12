import React from "react";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import UserForm from "../../../../components/UserForm/UserForm";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import "./AdminAddUser.css";

const AdminAddUser = () => {
  const fields = ["name", "surname", "phoneNumber"];

  const fieldLabels = {
    name: "Imię użytkownika",
    surname: "Nazwisko użytkownika",
    phoneNumber: "Numer telefonu użytkownika",
  };

  const fieldErrors = {
    name: "imię",
    surname: "nazwisko",
    phoneNumber: "numer telefonu",
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
