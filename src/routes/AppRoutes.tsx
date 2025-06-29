import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import { adminRoutes } from "./AdminRoutes";

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
