import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import UserForm from "../../../../components/UserForm/UserForm";
import AdminHeader from "../../../../components/AdminHeader/AdminHeader";
import { vet_user } from "../../../../data/vet_user";
import "./AdminModifyUser.css";

const AdminModifyUser = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const formData = location?.state?.formData;
  const userID = location?.state?.userID;

  useEffect(() => {
    if (!formData || !userID) {
      navigate("/error");
    }
  }, [formData, userID]);

  console.log(formData)

  return (
    <div className="admin-add-animal">
      <AdminHeader />
      <BackArrow title="Modyfikacja użytkownika" />
      <UserForm
        fields={fields}
        fieldLabels={fieldLabels}
        fieldErrors={fieldErrors}
        savedForm={formData}
        buttonText="Modyfikuj użytkownika"
        navigateTo={`/admin/users/user/modify/confirm`}
        type="modify"
      />
    </div>
  );
};

export default AdminModifyUser;
