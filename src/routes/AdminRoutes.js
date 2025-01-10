import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../pages/AdminPages/Admin/Admin";
import AdminVisit from "../pages/AdminPages/Visits/AdminVisit/AdminVisit";
import AdminAddVisit from "../pages/AdminPages/Visits/AdminAddVisit/AdminAddVisit";
import AdminModifyVisit from "../pages/AdminPages/Visits/AdminModifyVisit/AdminModifyVisit";
import AdminConfirmModifyVisit from "../pages/AdminPages/Visits/AdminConfirmModifyVisit/AdminConfirmModifyVisit";
import AdminConfirmAddVisit from "../pages/AdminPages/Visits/AdminConfirmAddVisit/AdminConfirmAddVisit";
import AdminConfirmDeleteVisit from "../pages/AdminPages/Visits/AdminConfirmDeleteVisit/AdminConfirmDeleteVisit";
import AdminAddRecommendation from "../pages/AdminPages/Recommendations/AdminAddRecommendation/AdminAddRecommendation";
import AdminConfirmAddRecommendation from "../pages/AdminPages/Recommendations/AdminConfirmAddRecommendation/AdminConfirmAddRecommendation";
import AdminModifyRecommendation from "../pages/AdminPages/Recommendations/AdminModifyRecommendation/AdminModifyRecommendation";
import AdminConfirmModifyRecommendation from "../pages/AdminPages/Recommendations/AdminConfirmModifyRecommendation/AdminConfirmModifyRecommendation";
import AdminConfirmDeleteRecommendation from "../pages/AdminPages/Recommendations/AdminConfirmDeleteRecommendation/AdminConfirmDeleteRecommendation";
import AdminAnimals from "../pages/AdminPages/Animals/AdminAnimals/AdminAnimals";
import AdminAnimalRecommendations from "../pages/AdminPages/Animals/AdminAnimalRecommendations/AdminAnimalRecommendations";
import AdminAddAnimal from "../pages/AdminPages/Animals/AdminAddAnimal/AdminAddAnimal";
import AdminConfirmAddAnimal from "../pages/AdminPages/Animals/AdminConfirmAddAnimal/AdminConfirmAddAnimal";
import AdminModifyAnimal from "../pages/AdminPages/Animals/AdminModifyAnimal/AdminModifyAnimal";
import AdminConfirmModifyAnimal from "../pages/AdminPages/Animals/AdminConfirmModifyAnimal/AdminConfirmModifyAnimal";
import AdminConfirmDeleteAnimal from "../pages/AdminPages/Animals/AdminConfirmDeleteAnimal/AdminConfirmDeleteAnimal";
import AdminUsers from "../pages/AdminPages/Users/AdminUsers/AdminUsers";
import AdminAddUser from "../pages/AdminPages/Users/AdminAddUser/AdminAddUser";
import AdminConfirmAddUser from "../pages/AdminPages/Users/AdminConfirmAddUser/AdminConfirmAddUser";
import AdminModifyUser from "../pages/AdminPages/Users/AdminModifyUser/AdminModifyUser";
import AdminConfirmModifyUser from "../pages/AdminPages/Users/AdminConfirmModifyUser/AdminConfirmModifyUser";
import AdminConfirmDeleteUser from "../pages/AdminPages/Users/AdminConfirmDeleteUser/AdminConfirmDeleteUser";
import AdminSuccess from "../pages/AdminPages/AdminSuccess/AdminSuccess";
import AdminLogout from "../pages/AdminPages/AdminLogout/AdminLogout";

const AdminRoutes = () => (
  <Routes>
    <Route path="/visits" element={<Admin />} />
    <Route path="/visits/visit" element={<AdminVisit />} />
    <Route path="/visits/admin-add-visit" element={<AdminAddVisit />} />
    <Route
      path="/visits/admin-add-visit/confirm"
      element={<AdminConfirmAddVisit />}
    />
    <Route
      path="/visits/visit/modify"
      element={<AdminModifyVisit />}
    />
    <Route
      path="/visits/visit/modify/confirm"
      element={<AdminConfirmModifyVisit />}
    />
    <Route
      path="/visits/visit/delete"
      element={<AdminConfirmDeleteVisit />}
    />
    <Route
      path="/visits/recommendation/add"
      element={<AdminAddRecommendation />}
    />
    <Route
      path="/visits/recommendation/add/confirm"
      element={<AdminConfirmAddRecommendation />}
    />
    <Route
      path="/visits/recommendation/modify"
      element={<AdminModifyRecommendation />}
    />
    <Route
      path="/visits/recommendation/modify/confirm"
      element={<AdminConfirmModifyRecommendation />}
    />
    <Route
      path="/visits/recommendation/delete"
      element={<AdminConfirmDeleteRecommendation />}
    />
    <Route path="/animals" element={<AdminAnimals />} />
    <Route
      path="/animals/animal"
      element={<AdminAnimalRecommendations />}
    />
    <Route path="/animals/add-animal" element={<AdminAddAnimal />} />
    <Route
      path="/animals/add-animal/confirm"
      element={<AdminConfirmAddAnimal />}
    />
    <Route
      path="/animals/delete"
      element={<AdminConfirmDeleteAnimal />}
    />
    <Route path="/animals/modify" element={<AdminModifyAnimal />} />
    <Route
      path="/animals/modify/confirm"
      element={<AdminConfirmModifyAnimal />}
    />
    <Route path="/users" element={<AdminUsers />} />
    <Route path="/users/add-user" element={<AdminAddUser />} />
    <Route path="/users/add-user/confirm" element={<AdminConfirmAddUser />} />
    <Route
      path="/users/user/modify"
      element={<AdminModifyUser />}
    />
    <Route
      path="/users/user/modify/confirm"
      element={<AdminConfirmModifyUser />}
    />
    <Route
      path="/users/user/delete"
      element={<AdminConfirmDeleteUser />}
    />
    <Route path="/success" element={<AdminSuccess />} />
    <Route path="/logout" element={<AdminLogout />} />
  </Routes>
);

export default AdminRoutes;
