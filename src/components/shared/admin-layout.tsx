import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

function AdminLayout() {



  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div >
        <Sidebar  />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="container max-w-none p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
