import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Coupon } from "@/types/course";

interface CouponsTableProps {
  coupons: Coupon[];
  onDelete: (id: string) => void;
  onEdit: (coupon: Coupon) => void;
  isLoading?: boolean;
}

export default function CouponsTable({ 
  coupons, 
  onDelete, 
  onEdit, 
  isLoading = false 
}: CouponsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG');
  };

  const formatDiscount = (discount: number, type: 'FIXED' | 'PERCENTAGE') => {
    return type === 'FIXED' ? `${discount} ج.م` : `${discount}%`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-muted-foreground">جاري التحميل...</div>
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-muted-foreground">لا توجد كوبونات</div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>الكود</TableHead>
          <TableHead>التخفيض</TableHead>
          <TableHead>النوع</TableHead>
          <TableHead>تاريخ الإنشاء</TableHead>
          <TableHead>تاريخ الانتهاء</TableHead>
          <TableHead>الاستخدامات</TableHead>
          <TableHead>الحد الأقصى</TableHead>
          <TableHead>جميع الدورات</TableHead>
          <TableHead>الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coupons.map((coupon) => (
          <TableRow key={coupon.id}>
            <TableCell className="font-mono font-medium">
              {coupon.code}
            </TableCell>
            <TableCell>
              {formatDiscount(coupon.discount, coupon.type)}
            </TableCell>
            <TableCell>
              <Badge variant={coupon.type === 'FIXED' ? 'default' : 'secondary'}>
                {coupon.type === 'FIXED' ? 'مبلغ ثابت' : 'نسبة مئوية'}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(coupon.createdAt)}</TableCell>
            <TableCell>{formatDate(coupon.expiresAt)}</TableCell>
            <TableCell>{coupon.uses}</TableCell>
            <TableCell>{coupon.limit}</TableCell>
            <TableCell>
              <Badge variant={coupon.allCourses ? 'default' : 'outline'}>
                {coupon.allCourses ? 'نعم' : 'لا'}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(coupon)}
                >
                  تعديل
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(coupon.id)}
                  disabled={deletingId === coupon.id}
                >
                  {deletingId === coupon.id ? 'حذف...' : 'حذف'}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 