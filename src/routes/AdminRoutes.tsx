import AdminLayout from "@/components/shared/admin-layout";
import Admin from "@/pages";
import Paths from "@/pages/paths";
import CreateNewPath from "@/pages/paths/create";
import ManagePath from "@/pages/paths/manage";
import Users from "@/pages/users";
import { Route } from "react-router-dom";
export const adminRoutes = (
  <Route path="admin" element={<AdminLayout />}>
    <Route index element={<Admin />} />
    <Route path="users" element={<Users />} />
    <Route path="profile" element={<div>Profile Page</div>} />
    <Route path="settings" element={<div>Settings Page</div>} />
    <Route path="paths">
      <Route index element={<Paths />} />
      <Route path="create" element={<CreateNewPath />} />
      <Route path=":pathSlug/manage" element={<ManagePath />} />
    </Route>
  </Route>
);
