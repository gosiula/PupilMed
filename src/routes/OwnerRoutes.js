import React from "react";
import { Routes, Route } from "react-router-dom";
import Owner from "../pages/OwnerPages/Owner/Owner";
import OwnerAnimals from "../pages/OwnerPages/OwnerAnimals/OwnerAnimals";
import OwnerRecommendations from "../pages/OwnerPages/OwnerRecommendations/OwnerRecommendations";
import OwnerVisit from "../pages/OwnerPages/OwnerVisit/OwnerVisit";
import OwnerLogout from "../pages/OwnerPages/OwnerLogout/OwnerLogout";
import OwnerAccount from "../pages/OwnerPages/Account/OwnerAccount/OwnerAccount";
import OwnerChangePassword from "../pages/OwnerPages/Account/OwnerChangePassword/OwnerChangePassword";
import OwnerConfirmChangePassword from "../pages/OwnerPages/Account/OwnerConfirmChangePassword/OwnerConfirmChangePassword";

const OwnerRoutes = () => (
  <Routes>
    <Route path="/visits" element={<Owner />} />
    <Route path="/visits/visit" element={<OwnerVisit />} />
    <Route path="/animals" element={<OwnerAnimals />} />
    <Route path="/animals/recommendation" element={<OwnerRecommendations />} />
    <Route path="/account" element={<OwnerAccount />} />
    <Route path="/account/change_password" element={<OwnerChangePassword />} />
    <Route path="/account/change_password/confirm" element={<OwnerConfirmChangePassword />} />
    <Route path="/logout" element={<OwnerLogout />} />
  </Routes>
);

export default OwnerRoutes;
