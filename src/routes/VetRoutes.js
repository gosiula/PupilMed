import React from "react";
import { Routes, Route } from "react-router-dom";
import Vet from "../pages/VetPages/Vet/Vet";
import VetAccount from "../pages/VetPages/Account/VetAccount/VetAccount";
import VetChangePassword from "../pages/VetPages/Account/VetChangePassword/VetChangePassword";
import VetConfirmChangePassword from "../pages/VetPages/Account/VetConfirmChangePassword/VetConfirmChangePassword";
import VetSuccess from "../pages/VetPages/VetSuccess/VetSuccess";
import VetLogout from "../pages/VetPages/VetLogout/VetLogout";
import VetVisit from "../pages/VetPages/Visits/VetVisit/VetVisit";
import VetAddVisit from "../pages/VetPages/Visits/VetAddVisit/VetAddVisit";
import VetConfirmAddVisit from "../pages/VetPages/Visits/VetConfirmAddVisit/VetConfirmAddVisit";
import VetModifyVisit from "../pages/VetPages/Visits/VetModifyVisit/VetModifyVisit";
import VetConfirmModifyVisit from "../pages/VetPages/Visits/VetConfirmModifyVisit/VetConfirmModifyVisit";
import VetConfirmDeleteVisit from "../pages/VetPages/Visits/VetConfirmDeleteVisit/VetConfirmDeleteVisit";
import VetAddRecommendation from "../pages/VetPages/Recommendations/VetAddRecommendation/VetAddRecommendation";
import VetConfirmAddRecommendation from "../pages/VetPages/Recommendations/VetConfirmAddRecommendation/VetConfirmAddRecommendation";
import VetModifyRecommendation from "../pages/VetPages/Recommendations/VetModifyRecommendation/VetModifyRecommendation";
import VetConfirmModifyRecommendation from "../pages/VetPages/Recommendations/VetConfirmModifyRecommendation/VetConfirmModifyRecommendation";
import VetConfirmDeleteRecommendation from "../pages/VetPages/Recommendations/VetConfirmDeleteRecommendation/VetConfirmDeleteRecommendation";

const VetRoutes = () => (
  <Routes>
    <Route path="/visits" element={<Vet />} />
    <Route path="/success" element={<VetSuccess />} />
    <Route path="/account" element={<VetAccount />} />
    <Route path="/account/change_password" element={<VetChangePassword />} />
    <Route path="/account/change_password/confirm" element={<VetConfirmChangePassword />} />
    <Route path="/logout" element={<VetLogout />} />
    <Route path="/visits/visit" element={<VetVisit />} />
    <Route path="/visits/vet-add-visit" element={<VetAddVisit />} />
    <Route path="/visits/vet-add-visit/confirm" element={<VetConfirmAddVisit />} />
    <Route path="/visits/visit/modify" element={<VetModifyVisit />} />
    <Route path="/visits/visit/modify/confirm" element={<VetConfirmModifyVisit />} />
    <Route path="/visits/visit/delete" element={<VetConfirmDeleteVisit />} />
    <Route path="/visits/recommendation/add" element={<VetAddRecommendation />} />
    <Route path="/visits/recommendation/add/confirm" element={<VetConfirmAddRecommendation />} />
    <Route path="/visits/recommendation/modify" element={<VetModifyRecommendation />} />
    <Route path="/visits/recommendation/modify/confirm" element={<VetConfirmModifyRecommendation />} />
    <Route path="/visits/recommendation/delete" element={<VetConfirmDeleteRecommendation />} />

  </Routes>
);

export default VetRoutes;
