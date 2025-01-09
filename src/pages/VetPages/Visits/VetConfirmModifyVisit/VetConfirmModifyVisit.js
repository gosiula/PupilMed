import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../../../../components/BackArrow/BackArrow";
import Confirmation from "../../../../components/Confirmation/Confirmation";
import VetHeader from "../../../../components/VetHeader/VetHeader";
import "./VetConfirmModifyVisit.css";

const VetConfirmModifyVisit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState({});

    const formData = location.state?.formData || {};

  const handleConfirm = () => {
      modifyVisit();

    // navigate("/vet/success", {
    //   state: {
    //     message: "Sukces! Wizyta została zmodyfikowana!",
    //     navigateTo: "/vet/visits",
    //   },
    // });
  };

    const modifyVisit = async () => {
        try {
            const authData = JSON.parse(localStorage.getItem("authData"));
            const token = authData?.token;

            if (!token) {
                throw new Error("Token not found");
            }

            console.log("Token:", token);
            console.log("FormData:", formData);

            const body = {
                id: formData.id,
                date: formData.date,
                hour: formData.hour,
                visitType: formData.visitType,
                phoneNumber: formData.phoneNumber,
                price: formData.price,
                petName: formData.petName
            };

            const resp = await fetch("http://localhost:8080/vet/modify-visit", {
                method: "PUT",
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,},
                body: JSON.stringify(body)
            });

            if (!resp.ok) {
                const errorDetails = await resp.text();
                throw new Error(`Failed to modify visit: ${resp.status} - ${errorDetails}`);
            }

            const json = await resp.json();

            console.log("Response JSON from the server:", json);

            setStatus(json);
        } catch (error) {
            console.error("Error fetching visits:", error);
            // setError("Niepoprawne dane");
        }
    };

  return (
    <div>
      <VetHeader />
      <BackArrow title="Potwierdzenie" />
      <Confirmation
        onConfirm={handleConfirm}
        title={`Czy na pewno chcesz zmodyfikować wizytę w dniu ${formData.data} o godzinie ${formData.godzina} dla właściciela o numerze ${formData.numer_telefonu_wlasciciela} oraz weterynarza o numerze ${formData.numer_telefonu_weterynarza}?`}
      />
    </div>
  );
};

export default VetConfirmModifyVisit;
