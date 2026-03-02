import { useAuthStore } from "@/features/auth/store";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/features/auth/store";
import { isAdmin } from "@/lib/auth-utils";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  adminOnly?: boolean;
}

export function ProtectedRoute({
  children,
  redirectTo = "/",
  adminOnly = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const user = useUser();
  const location = useLocation();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className={cn('flex', 'items-center', 'justify-center', 'min-h-screen')}>
        <div className={cn('animate-spin', 'rounded-full', 'h-8', 'w-8', 'border-b-2', 'border-primary')}></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check admin-only access
  if (adminOnly && !isAdmin(user)) {
    toast.error('غير مصرح لك بالوصول إلى لوحة الإدارة. هذا المحتوى متاح للمدراء فقط.');
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function PublicRoute({
  children,
  redirectTo = "/admin",
}: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className={cn('flex', 'items-center', 'justify-center', 'min-h-screen')}>
        <div className={cn('animate-spin', 'rounded-full', 'h-8', 'w-8', 'border-b-2', 'border-primary')}></div>
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
