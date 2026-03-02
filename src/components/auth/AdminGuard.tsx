import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/features/auth/store';
import { isAdmin } from '@/lib/auth-utils';
import { toast } from 'sonner';

interface AdminGuardProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

export default function AdminGuard({ 
  children, 
  fallbackPath = '/' 
}: AdminGuardProps) {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isAdmin(user)) {
      toast.error('غير مصرح لك بالوصول إلى لوحة الإدارة. هذا المحتوى متاح للمدراء فقط.');
      navigate(fallbackPath);
    }
  }, [user, navigate, fallbackPath]);

  // Don't render children if user is not admin
  if (user && !isAdmin(user)) {
    return null;
  }

  return <>{children}</>;
}
