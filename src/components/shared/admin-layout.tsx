import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

function AdminLayout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-muted/30">
        <div className="container max-w-none p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
