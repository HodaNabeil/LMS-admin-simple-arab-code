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
import type { Order } from "../../types";

interface OrdersTableProps {
  orders: Order[];
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "date",
    header: "التاريح",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "PaymentMethod",
    header: "طريقة الدفع",
    cell: ({ row }) => <div>{row.getValue("PaymentMethod")}</div>,
  },
  {
    accessorKey: "Status",
    header: "الحالة",
    cell: ({ row }) => <div>{row.getValue("Status")}</div>,
  },
  {
    accessorKey: "Amount",
    header: "المبلغ",
    cell: ({ row }) => <div>{row.getValue("Amount")}</div>,
  },
  {
    accessorKey: "Currency",
    header: "العملة",
    cell: ({ row }) => <div>{row.getValue("Currency")}</div>,
  },
  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: ({ row }) => {
      // Transform Order to OrderFormData
      const order = row.original;
      const orderFormData = {
        price: order.price,
        discountCode: "", // Default empty since not in Order
        orderStatus: order.Status ? { value: order.Status, label: order.Status } : null,
        paymentMethod: order.PaymentMethod ? { value: order.PaymentMethod, label: order.PaymentMethod } : null,
        currency: order.Currency ? { value: order.Currency, label: order.Currency } : null,
        courses: [], // Default empty since not in Order
        user: null, // Default null since not in Order
      };

      return (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        >
          <EditOrder orderId={row.getValue("id")}
            initialData={orderFormData}
          />
        </Button>
      );
    },
  },
];

function OrdersTable({ orders }: OrdersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
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

export default OrdersTable;
