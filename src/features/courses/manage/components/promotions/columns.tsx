import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Coupon } from "@/types/course";
import { Edit } from "lucide-react";
import DeleteCoupon from "./DeleteCoupon";
import CouponFormDialog from "./CreateCouponDialog";

interface GetColumnsProps {
    onEdit: (coupon: Coupon) => void;
    onDelete: (id: string) => void;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG");
};

const formatDiscount = (value: number, type: string) => {
    return type === "FIXED" ? `${value} ج.م` : `${value}%`;
};

export const getColumns = ({
    onEdit,
    onDelete,
}: GetColumnsProps): ColumnDef<Coupon>[] => [
        {
            accessorKey: "code",
            header: "الكود",
            cell: ({ row }) => (
                <span className="font-mono font-medium">{row.getValue("code")}</span>
            ),
        },
        {
            accessorKey: "value",
            header: "التخفيض",
            cell: ({ row }) => formatDiscount(row.original.value, row.original.type),
        },
        {
            accessorKey: "type",
            header: "النوع",
            cell: ({ row }) => (
                <Badge
                    className={
                        row.original.type === "FIXED"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-blue-700"
                    }
                >
                    {row.original.type === "FIXED" ? "مبلغ ثابت" : "نسبة مئوية"}
                </Badge>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "تاريخ الإنشاء",
            cell: ({ row }) => formatDate(row.getValue("createdAt")),
        },
        {
            accessorKey: "expiresAt",
            header: "تاريخ الانتهاء",
            cell: ({ row }) => formatDate(row.getValue("expiresAt")),
        },
        {
            accessorKey: "allCourses",
            header: "جميع الدورات",
            cell: ({ row }) => {
                const isAllCourses = (row.original.courseIds?.length || 0) === 0;
                return (
                    <Badge
                        variant={isAllCourses ? "default" : "outline"}
                        className={
                            isAllCourses
                                ? "bg-blue-600 text-white"
                                : "border border-gray-400 text-gray-700"
                        }
                    >
                        {isAllCourses ? "نعم" : "لا"}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "isActive",
            header: "الحالة",
            cell: ({ row }) => (
                <Badge
                    variant={row.original.isActive ? "default" : "destructive"}
                    className={
                        row.original.isActive ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                    }
                >
                    {row.original.isActive ? "نشط" : "غير نشط"}
                </Badge>
            ),
        },
        {
            id: "actions",
            header: "الإجراءات",
            cell: ({ row }) => (
                <div className="flex gap-2 justify-center">
                    <CouponFormDialog
                        initialData={row.original}
                        onSubmit={(data) => onEdit({ ...row.original, ...data })}
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full border-gray-400 hover:bg-gray-100"
                            title="تعديل"
                        >
                            <Edit className="h-4 w-4 text-slate-800" />
                        </Button>
                    </CouponFormDialog>

                    <DeleteCoupon
                        couponId={row.original.id}
                        onDelete={onDelete}
                    />
                </div>
            ),
        },
    ];
