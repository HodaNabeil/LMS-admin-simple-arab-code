import AdminLayout from "@/components/shared/admin-layout";
import Admin from "@/pages";
import Users from "@/pages/users";
import { Route } from "react-router-dom";

export const adminRoutes = (
  <Route
    path="admin"
    element={<AdminLayout />}
  >
    <Route index element={<Admin />} />
    <Route
      path="users"
      element={<Users />}
    />
    <Route
      path="profile"
      element={<div>Profile Page</div>}
    />
    <Route
      path="settings"
      element={<div>Settings Page</div>}
    />
  </Route>
);
