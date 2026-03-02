import { Badge } from '@/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import type { Coupon } from '@/types/course';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { cn } from "../../../../lib/utils";
import { formatCurrency } from '@/lib/formatters';
import { EditCoupon } from '../EditCoupon';
import DeleteCoupon from '../DeleteCoupon';

// Type-safe column definition that enforces accessorKey matches Coupon properties
type CouponColumnDef = ColumnDef<Coupon, unknown> & {
  accessorKey?: keyof Coupon;
};

export const columns: CouponColumnDef[] = [
  {
    accessorKey: 'id',
    header: 'رقم الكوبون',
    cell: ({ row }) => <div className="text-right">{row.getValue('id')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'code',
    header: 'كود الكوبون',
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={cn('bg-purple-100', 'text-purple-800', 'border-purple-200', 'font-mono')}
      >
        {row.getValue('code')}
      </Badge>
    ),
  },
  {
    accessorKey: 'type',
    header: 'نوع الخصم',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return (
        <Badge variant="outline" className={cn('border-blue-200', 'text-blue-800')}>
          {type === 'PERCENTAGE' ? 'نسبة مئوية' : 'مبلغ ثابت'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'value',
    header: 'قيمة الخصم',
    cell: ({ row }) => {
      const value = row.getValue('value') as number;
      return (
        <div className="font-medium">
          {formatCurrency(value )}
          
        </div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'الوصف',
    cell: ({ row }) => {
      const description = row.getValue('description') as string;
      return (
        <p className={cn('text-foreground', 'truncate', 'max-w-64')}>
          {description || '---'}
        </p>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: 'الحالة',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      return (
        <Badge
          variant={isActive ? 'default' : 'secondary'}
          className={isActive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}
        >
          {isActive ? 'نشط' : 'غير نشط'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'expiresAt',
    header: 'تاريخ الانتهاء',
    cell: ({ row }) => {
      const expiresAt = row.getValue('expiresAt');
      if (!expiresAt) {
        return <div className="text-center">---</div>;
      }
      const date = new Date(expiresAt as string);
      const isExpired = date < new Date();
      return (
        <div className={`text-right text-xs whitespace-nowrap ${isExpired ? 'text-red-600' : ''}`}>
          {date.toLocaleDateString('ar-SA')}
        </div>
      );
    },
  },
  {
    accessorKey: 'maxUses',
    header: 'أقصى عدد استخدام',
    cell: ({ row }) => <div className="text-right">{row.getValue('maxUses') || '∞'}</div>,
  },
  {
    accessorKey: 'maxUsesPerUser',
    header: 'استخدام لكل مستخدم',
    cell: ({ row }) => <div className="text-right">{row.getValue('maxUsesPerUser') || '1'}</div>,
  },
  {
    accessorKey: 'minOrderAmount',
    header: 'الحد الأدنى للطلب',
    cell: ({ row }) => {
      const amount = row.getValue('minOrderAmount') as number;
      return <div className="text-right font-medium">{amount ? formatCurrency(amount) : '0'}</div>;
    },
  },
  {
    accessorKey: 'courseIds',
    header: 'عدد الدورات',
    cell: ({ row }) => {
      const courses = row.getValue('courseIds') as string[];
      return <div className="text-right">{courses?.length || 0}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'تاريخ الإنشاء',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return (
        <div className={cn('text-right', 'text-xs', 'whitespace-nowrap')}>
          {date.toLocaleDateString('ar-SA')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'الإجراءات',
    enableHiding: false,
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <div className={cn('flex', 'gap-2', 'items-center')}>
          <Link to={`/admin/coupons/${coupon.id}/manage`} className={cn('text-blue-600', 'hover:text-blue-800')}>
            <Edit className={cn('h-4', 'w-4')} />
          </Link>
          <DeleteCoupon couponId={coupon.id} couponCode={coupon.code} />
        </div>
      );
    },
  },
] satisfies ColumnDef<Coupon>[];
