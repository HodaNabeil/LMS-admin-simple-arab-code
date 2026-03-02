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
    courseId?: string;
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
    courseId,
}: GetColumnsProps): ColumnDef<Coupon>[] => [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground font-mono">{row.getValue("id")}</span>
            ),
        },
        {
            accessorKey: "code",
            header: "الكود",
            cell: ({ row }) => (
                <span className="font-bold text-blue-700 font-mono">{row.getValue("code")}</span>
            ),
        },
        {
            accessorKey: "value",
            header: "التخفيض",
            cell: ({ row }) => (
                <div className="font-semibold">
                    {formatDiscount(row.original.value, row.original.type)}
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: "النوع",
            cell: ({ row }) => (
                <Badge
                    variant="secondary"
                    className={
                        row.original.type === "FIXED"
                            ? "bg-blue-50 text-blue-700 border-blue-100"
                            : "bg-purple-50 text-purple-700 border-purple-100"
                    }
                >
                    {row.original.type === "FIXED" ? "مبلغ ثابت" : "نسبة مئوية"}
                </Badge>
            ),
        },
        {
            accessorKey: "description",
            header: "الوصف",
            cell: ({ row }) => (
                <span className="text-sm truncate max-w-[150px] inline-block" title={row.getValue("description")}>
                    {row.getValue("description") || "---"}
                </span>
            ),
        },
        {
            accessorKey: "maxUses",
            header: "أقصى استخدام",
            cell: ({ row }) => (
                <div className="text-center font-medium">
                    {row.getValue("maxUses") || "∞"}
                </div>
            ),
        },
        {
            accessorKey: "usedCount",
            header: "المستخدم",
            cell: ({ row }) => (
                <div className="text-center">
                    <span className="text-green-600 font-bold">{row.getValue("usedCount") || 0}</span>
                </div>
            ),
        },
        {
            accessorKey: "maxUsesPerUser",
            header: "لكل مستخدم",
            cell: ({ row }) => (
                <div className="text-center">
                    {row.getValue("maxUsesPerUser") || 1}
                </div>
            ),
        },
        {
            accessorKey: "minOrderAmount",
            header: "أقل طلب",
            cell: ({ row }) => (
                <div className="text-right">
                    {row.getValue("minOrderAmount") ? `${row.getValue("minOrderAmount")} ج.م` : "بدون حد"}
                </div>
            ),
        },
        {
            accessorKey: "startsAt",
            header: "تاريخ البدء",
            cell: ({ row }) => row.getValue("startsAt") ? formatDate(row.getValue("startsAt")) : "فوري",
        },
        {
            accessorKey: "expiresAt",
            header: "تاريخ الانتهاء",
            cell: ({ row }) => row.getValue("expiresAt") ? formatDate(row.getValue("expiresAt")) : "دائم",
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
            accessorKey: "createdAt",
            header: "تاريخ الإنشاء",
            cell: ({ row }) => (
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(row.getValue("createdAt"))}
                </div>
            ),
        },
        {
            accessorKey: "updatedAt",
            header: "آخر تحديث",
            cell: ({ row }) => (
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(row.getValue("updatedAt"))}
                </div>
            ),
        },
        {
            id: "actions",
            header: "الإجراءات",
            cell: ({ row }) => (
                <div className="flex gap-2 justify-center">
                    <CouponFormDialog
                        initialData={row.original}
                        onSubmit={(data) => onEdit({ ...row.original, ...data } as unknown as Coupon)}
                        courseId={courseId}
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full border-gray-200 hover:bg-gray-100"
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
