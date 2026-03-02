import type { User } from '@/types/user';

/**
 * Check if a user has admin privileges
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === 'ADMIN';
}

/**
 * Check if a user has instructor privileges
 */
export function isInstructor(user: User | null): boolean {
  return user?.role === 'INSTRUCTOR';
}

/**
 * Check if a user has student privileges
 */
export function isStudent(user: User | null): boolean {
  return user?.role === 'STUDENT';
}

/**
 * Get user role display name in Arabic
 */
export function getRoleDisplayName(role: string): string {
  switch (role) {
    case 'ADMIN':
      return 'مدير';
    case 'INSTRUCTOR':
      return 'مدرب';
    case 'STUDENT':
      return 'طالب';
    default:
      return 'غير معروف';
  }
}

/**
 * Validate admin access and throw error if not admin
 */
export function requireAdmin(user: User | null): void {
  if (!isAdmin(user)) {
    throw new Error('غير مصرح لك بالوصول إلى لوحة الإدارة. هذا المحتوى متاح للمدراء فقط.');
  }
}
