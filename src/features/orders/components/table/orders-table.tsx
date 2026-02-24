import React from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import EditOrder from "../edit-order";
import { OrdersTableMobile } from "./OrdersTableMobile";
import { OrdersTableDesktop } from "./OrdersTableDesktop";
import { Badge } from "@/components/ui/badge";
import type { Order, OrderFormData } from "../../types";

interface OrdersTableProps {
  orders: Order[];
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "رقم الطلب",
    cell: ({ row }) => (
      <div className="font-medium text-blue-600">{row.getValue("orderNumber")}</div>
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
      return <div className="font-bold">{total} {currency}</div>;
    },
  },
  {
    accessorKey: "items",
    header: "عدد الكورسات",
    cell: ({ row }) => <div>{(row.getValue("items") as []).length}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الطلب",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string);
      return (
        <div className="flex flex-col">
          <span>{date.toLocaleDateString("ar-EG")}</span>
          <span className="text-xs text-muted-foreground">
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
        user: { value: order.userId, label: order.userId },
        courses: order.items.map((item) => ({
          value: item.courseId,
          label: item.courseId, // Using courseId since courseName doesn't exist
        })),
        currency: { value: order.currency || "EGP", label: order.currency || "EGP" },
        coupon: order.couponCode ? { value: order.couponCode, label: order.couponCode } : null,
        subtotalCents: order.subtotalCents || 0,
        discountCents: order.discountCents || 0,
        taxCents: order.taxCents || 0,
        totalCents: order.totalCents || 0,
        couponCode: order.couponCode,
      };

      return (
        <EditOrder orderId={order.userId} initialData={orderFormData} />
      );
    },
  },
];

export function OrdersTable({ orders }: OrdersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: orders,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <OrdersTableMobile table={table} />
      <OrdersTableDesktop table={table} />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} من{" "}
          {table.getFilteredRowModel().rows.length} صف محدد.
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            السابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            التالي
          </Button>
        </div>
      </div>
    </div>
  );
}
