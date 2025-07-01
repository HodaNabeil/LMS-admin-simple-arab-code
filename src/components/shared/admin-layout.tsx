// import { Outlet } from "react-router-dom";
// import Sidebar from "./sidebar";
// import { useState } from "react";
// import { ProtectedRoute } from "./guard-route";

// function AdminLayout() {
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

//   return (
//     <ProtectedRoute>
//       <div className="flex h-screen bg-background">
//         <Sidebar />
//         <Sidebar
//           isMobile={true}
//           isOpen={isMobileSidebarOpen}
//           onClose={() => setIsMobileSidebarOpen(false)}
//         />
//         <div className="flex-1 flex flex-col">
//           {/* Page Content */}
//           <main className="flex-1 overflow-y-auto bg-muted/30">
//             <div className="container max-w-none p-0">
//               <Outlet
//                 context={{
//                   setIsMobileSidebarOpen,
//                 }}
//               />
//             </div>
//           </main>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// export default AdminLayout;
import { Outlet } from "react-router-dom";
import { useState, lazy, Suspense } from "react";

const Sidebar = lazy(() => import("./sidebar"));
const ProtectedRoute = lazy(() =>
  import("./guard-route").then((mod) => ({ default: mod.ProtectedRoute }))
);

function AdminLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <Suspense fallback={<div>جاري تحميل لوحة التحكم...</div>}>
      <ProtectedRoute>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <Sidebar
            isMobile={true}
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          />
          <div className="flex-1 flex flex-col">
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
      </ProtectedRoute>
    </Suspense>
  );
}

export default AdminLayout;
