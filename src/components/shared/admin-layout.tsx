import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from './guard-route';
import { AppSidebar } from './app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';

function AdminLayout() {
  return (
    <ProtectedRoute adminOnly={true}>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-svh w-full bg-background overflow-hidden" dir="rtl">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 overflow-y-auto bg-muted/30">
              <div className="container  p-0">
                <Outlet />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

export default AdminLayout;
