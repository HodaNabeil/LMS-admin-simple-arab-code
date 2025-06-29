import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFound from "@/pages/not-found";
import { adminRoutes } from "./AdminRoutes";
import Login from "@/pages/login";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route index element={<Login />} />
        {adminRoutes}
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
