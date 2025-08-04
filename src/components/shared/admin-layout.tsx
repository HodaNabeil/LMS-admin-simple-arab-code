import { Outlet } from "react-router-dom";

import { ProtectedRoute } from "./guard-route";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";

function AdminLayout() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 ">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

export default AdminLayout;
