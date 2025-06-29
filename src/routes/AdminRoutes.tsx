import AdminLayout from "@/components/shared/admin-layout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import Admin from "@/pages";
import { Route } from "react-router-dom";

export const adminRoutes = (
  <Route
    path="admin"
    element={
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Admin />} />
    <Route path="profile" element={<div>Profile Page</div>} />
    <Route path="settings" element={<div>Settings Page</div>} />
  </Route>
);
