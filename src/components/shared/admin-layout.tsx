import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { useState } from "react";

function AdminLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <Sidebar
        isMobile={true}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="container max-w-none p-0">
            <Outlet
              context={{
                setIsMobileSidebarOpen,
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
