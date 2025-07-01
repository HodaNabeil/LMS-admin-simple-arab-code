import AdminLayout from "@/components/shared/admin-layout";
import Admin from "@/pages";
import { Route } from "react-router-dom";
export const adminRoutes = (
  <Route path="admin" element={<AdminLayout />}>
    <Route index element={<Admin />} />
  </Route>
);
