import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "@/components/shared/loader";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

const AdminLayout = lazy(() => import("@/components/shared/admin-layout"));
const Admin = lazy(() => import("@/pages"));

export const adminRoutes = (
  <Route
    path="admin"
    element={
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <AdminLayout />
        </ErrorBoundary>
      </Suspense>
    }
  >
    <Route
      index
      element={
        <Suspense fallback={<Loader />}>
          <Admin />
        </Suspense>
      }
    />
    <Route path="profile" element={<div>Profile Page</div>} />
    <Route path="settings" element={<div>Settings Page</div>} />
  </Route>
);
