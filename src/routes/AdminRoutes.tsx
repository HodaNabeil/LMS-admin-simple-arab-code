import AdminLayout from "@/components/shared/admin-layout";
import NewAddPath from "@/features/paths/components/NewAddPath";
import Admin from "@/pages";
import Paths from "@/pages/paths";
import Users from "@/pages/users";
import { Route } from "react-router-dom";

export const adminRoutes = (
  <Route path="admin" element={<AdminLayout />}>
    <Route index element={<Admin />} />
    <Route path="users" element={<Users />} />
    <Route path="profile" element={<div>Profile Page</div>} />
    <Route path="settings" element={<div>Settings Page</div>} />
    <Route path="paths" element={<Paths />} />
    <Route path="paths/create" element={<NewAddPath />} />
  </Route>
);
