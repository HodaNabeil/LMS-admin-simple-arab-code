import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFound from "@/pages/not-found";
import { adminRoutes } from "./AdminRoutes";
import Login from "@/pages/login";
import { PublicRoute } from "@/components/shared/guard-route";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route
          index
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {adminRoutes}
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
