import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFound from "@/pages/not-found";
import AdminLayout from "@/components/shared/admin-layout";
import Admin from "@/pages/index";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Admin />} />
        <Route path="profile" element={<div>Profile Page</div>} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
