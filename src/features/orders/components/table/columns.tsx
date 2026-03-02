import { cn } from "../../../../lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "@/types/orders";
import type { OrderFormData } from "@/validations/order";
import { Badge } from "@/components/ui/badge";
import EditOrder from "../edit-order";
export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "رقم الطلب",
    cell: ({ row }) => (
      <div className={cn('font-medium', 'text-blue-600')}>{row.getValue("orderNumber")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "البريد الإلكتروني",
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant: "secondary" | "default" | "destructive" =
        status === "PENDING"
          ? "secondary"
          : status === "COMPLETED"
            ? "default"
            : "destructive";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "total",
    header: "الإجمالي",
    cell: ({ row }) => {
      const total = row.getValue("total") as number;
      const currency = row.original.currency || "EGP";
      return <div className={cn('font-bold')}>{total} {currency}</div>;
    },
  },
  {
    accessorKey: "items",
    header: "عدد الكورسات",
    cell: ({ row }) => <div>{(row.getValue("items") as []).length}</div>,
  },
  {
    accessorKey: "subtotal",
    header: "المبلغ الفرعي",
    cell: ({ row }) => {
      const subtotal = row.getValue("subtotal") as number;
      const currency = row.original.currency || "EGP";
      return <div>{subtotal} {currency}</div>;
    },
  },
  {
    accessorKey: "discount",
    header: "الخصم",
    cell: ({ row }) => {
      const discount = row.getValue("discount") as number;
      const currency = row.original.currency || "EGP";
      return <div className="text-red-600">-{discount} {currency}</div>;
    },
  },
  {
    accessorKey: "tax",
    header: "الضريبة",
    cell: ({ row }) => {
      const tax = row.getValue("tax") as number;
      const currency = row.original.currency || "EGP";
      return <div>{tax} {currency}</div>;
    },
  },
  {
    accessorKey: "couponCode",
    header: "كود الخصم",
    cell: ({ row }) => <div>{row.getValue("couponCode") || "---"}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الطلب",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string);
      return (
        <div className={cn('flex', 'flex-col')}>
          <span>{date.toLocaleDateString("ar-EG")}</span>
          <span className={cn('text-xs', 'text-muted-foreground')}>
            {date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "completedAt",
    header: "تاريخ الإكمال",
    cell: ({ row }) => {
      const completedAt = row.getValue("completedAt") as string;
      if (!completedAt) return <div>---</div>;
      const date = new Date(completedAt);
      return (
        <div className={cn('flex', 'flex-col')}>
          <span>{date.toLocaleDateString("ar-EG")}</span>
          <span className={cn('text-xs', 'text-muted-foreground')}>
            {date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "آخر تحديث",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt") as string);
      return (
        <div className={cn('flex', 'flex-col')}>
          <span>{date.toLocaleDateString("ar-EG")}</span>
          <span className={cn('text-xs', 'text-muted-foreground')}>
            {date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      const orderFormData: OrderFormData = {
        userId: order.userId,
        courseId: order.items[0]?.courseId || "",
        coursePriceCents: order.items[0]?.priceCents || 0,
        currency: order.currency || "EGP",
        couponId: order.couponId || "",
        discountCents: order.discountCents || 0,
        taxCents: order.taxCents || 0,
      };

      return <EditOrder orderId={order.id} initialData={orderFormData} 
      />;
    },
  },
];