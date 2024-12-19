// ownerRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./App";
import Owner from "./admin/Admin";
import AdminVisit from "./admin/visits/AdminVisit";
import AdminAddVisit from "./admin/visits/AdminAddVisit";
import AdminConfirmAddVisit from "./admin/visits/AdminConfirmAddVisit";
import AdminModifyVisit from "./admin/visits/AdminModifyVisit";
import AdminConfirmModifyVisit from "./admin/visits/AdminConfirmModifyVisit";
import AdminConfirmDeleteVisit from "./admin/visits/AdminConfirmDeleteVisit";
import AdminSuccess from "./admin/visits/AdminSuccess";
import Admin from "./admin/Admin";
import AdminLogout from "./admin/AdminLogout";
// Import pozostałych komponentów

export const adminRoutes = (
    <>
        <Route
            path="/admin"
            element={<PrivateRoute allowedTypes={["admin"]} component={Admin} />}
        />
        <Route
            path="/admin-visit"
            element={
                <PrivateRoute
                    allowedTypes={["admin"]}
                    component={AdminVisit}
                />
            }
        />
        <Route
            path="/admin-add-visit"
            element={
                <PrivateRoute
                    allowedTypes={["admin"]}
                    component={AdminAddVisit}
                />
            }
        />
        <Route
            path="/admin-confirm-add-visit"
            element={
                <PrivateRoute
                    allowedTypes={["admin"]}
                    component={AdminConfirmAddVisit}
                />
            }
        />
        <Route
            path="/admin-modify-visit"
            element={
                <PrivateRoute
                    allowedTypes={["admin"]}
                    component={AdminModifyVisit}
                />
            }
        />
        <Route
            path="/admin-confirm-modify-visit"
            element={
                <PrivateRoute
                    allowedTypes={["admin"]}
                    component={AdminConfirmModifyVisit}
                />
            }
        />
        <Route
            path="/admin-confirm-delete-visit"
            element={
                <PrivateRoute
                    allowedTypes={["admin"]}
                    component={AdminConfirmDeleteVisit}
                />
            }
        />
        <Route
            path="/admin-success"
            element={
                <PrivateRoute
                    allowedTypes={["admin"]}
                    component={AdminSuccess}
                />
            }
        />
        <Route
            path="/admin"
            element={
            <PrivateRoute
                allowedTypes={["admin"]}
                component={Admin} />}
        />
        <Route
            path="/admin-logout"
            element={
            <PrivateRoute
                allowedTypes={["admin"]}
                component={AdminLogout} />}
        />
    </>
);
