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

const headers = [
  { key: "code", label: "الكود" },
  { key: "discount", label: "التخفيض" },
  { key: "type", label: "النوع" },
  { key: "createdAt", label: "تاريخ الإنشاء" },
  { key: "expiresAt", label: "تاريخ الانتهاء" },
  { key: "uses", label: "الاستخدامات" },
  { key: "limit", label: "الحد الأقصى" },
  { key: "allCourses", label: "جميع الدورات" },
  { key: "actions", label: "الإجراءات" },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ar-EG");
}

function formatDiscount(discount: number, type: "FIXED" | "PERCENTAGE") {
  return type === "FIXED" ? `${discount} ج.م` : `${discount}%`;
}

export default function CouponsTable({
  coupons,
  onDelete,
  onEdit,
  isLoading = false,
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-muted-foreground">جاري التحميل...</div>
      </div>
    );
  }

  if (!coupons && !isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-muted-foreground">لا توجد كوبونات</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <Table className="w-full border-2 border-solid border-gray-200 rounded-md shadow-sm">
        <TableHeader className="bg-gray-100 border-b-2 border-solid border-gray-200 text-right sticky top-0 z-10">
          <TableRow className="text-right font-bold">
            {headers.map((header, index) => (
              <TableHead
                key={header.key}
                className={`${index === 0 ? "text-right" : "text-left"} font-bold bg-gray-100 sticky top-0 z-10`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white border-2 border-solid border-gray-200 rounded-md text-right">
          {coupons.map((coupon) => (
            <TableRow key={coupon.id} className="py-3 hover:bg-gray-50 transition-colors">
              {headers.map((header) => {
                switch (header.key) {
                  case "code":
                    return (
                      <TableCell key="code" className="font-mono font-medium py-3">
                        {coupon.code}
                      </TableCell>
                    );
                  case "discount":
                    return (
                      <TableCell key="discount" className="py-3">
                        {formatDiscount(coupon.discount, coupon.type)}
                      </TableCell>
                    );
                  case "type":
                    return (
                      <TableCell key="type" className="py-3">
                        <Badge variant={coupon.type === "FIXED" ? "default" : "secondary"} className={coupon.type === "FIXED" ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-700"}>
                          {coupon.type === "FIXED" ? "مبلغ ثابت" : "نسبة مئوية"}
                        </Badge>
                      </TableCell>
                    );
                  case "createdAt":
                    return <TableCell key="createdAt" className="py-3"> {formatDate(coupon.createdAt)} </TableCell>;
                  case "expiresAt":
                    return <TableCell key="expiresAt" className="py-3"> {formatDate(coupon.expiresAt)} </TableCell>;
                  case "uses":
                    return <TableCell key="uses" className="py-3"> {coupon.uses} </TableCell>;
                  case "limit":
                    return <TableCell key="limit" className="py-3"> {coupon.limit} </TableCell>;
                  case "allCourses":
                    return (
                      <TableCell key="allCourses" className="py-3">
                        <Badge variant={coupon.allCourses ? "default" : "outline"} className={coupon.allCourses ? "bg-blue-600 text-white" : "border border-gray-400 text-gray-700"}>
                          {coupon.allCourses ? "نعم" : "لا"}
                        </Badge>
                      </TableCell>
                    );
                  case "actions":
                    return (
                      <TableCell key="actions" className="py-3">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full border-gray-400 hover:bg-gray-100"
                            onClick={() => onEdit(coupon)}
                            title="تعديل"
                          >
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#1e293b" strokeWidth="2" d="M16.475 5.408a2.5 2.5 0 1 1 3.536 3.535L8.5 20.454l-4.243.707.707-4.243L16.475 5.408Z"/><path stroke="#1e293b" strokeWidth="2" d="m15 7 2 2"/></svg>
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleDelete(coupon.id)}
                            disabled={deletingId === coupon.id}
                            title="حذف"
                          >
                            {deletingId === coupon.id ? (
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path stroke="#fff" strokeWidth="2" d="M8 12h8"/></svg>
                            ) : (
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M3 6h18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#fff" strokeWidth="2"/><rect x="5" y="6" width="14" height="14" rx="2" stroke="#fff" strokeWidth="2"/><path d="M10 11v6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M14 11v6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    );
                  default:
                    return null;
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 