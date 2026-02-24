import React from "react";
import {
    flexRender,
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
import { CreditCard, MoreHorizontal, } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatPaymentMethod, formatPaymentStatus } from "@/lib/formatters";
import type { Payment } from "@/types/payments";
import { cn } from "../../../lib/utils";

interface PaymentTableProps {
    data: Payment[];
}

const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "id",
        header: "رقم العملية",
        cell: ({ row }) => (
            <div className={cn('font-medium', 'text-blue-600')}>#{(row.getValue("id") as string).slice(-6)}</div>
        ),
    },
    {
        accessorKey: "orderId",
        header: "رقم الطلب",
        cell: ({ row }) => {
            const orderId = row.getValue("orderId") as string;
            return (
                <div className="font-medium">#{orderId?.slice(-6) || 'N/A'}</div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "التاريخ",
        cell: ({ row }) => {
            const payment = row.original;
            const date = new Date(payment.createdAt);
            return (
                <div className={cn('flex', 'flex-col')}>
                    <span className="font-medium">{date.toLocaleDateString("ar-EG")}</span>
                    <span className={cn('text-xs', 'text-muted-foreground')}>
                        {date.toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "amountCents",
        header: "المبلغ",
        cell: ({ row }) => {
            const amount = (row.getValue("amountCents") as number) / 100;
            return <div className="font-bold">{formatCurrency(amount)}</div>;
        },
    },
    {
        accessorKey: "provider",
        header: "طريقة الدفع",
        cell: ({ row }) => {
            const provider = row.original.provider;
            return (
                <div className={cn('flex', 'items-center', 'gap-2')}>
                    <CreditCard className={cn('w-4', 'h-4', 'text-muted-foreground')} />
                    <span>{formatPaymentMethod(provider)}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "الحالة",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const isCompleted = status === "SUCCEEDED";
            const isPending = status === "PENDING" || status === "PROCESSING";

            const variant = isCompleted ? "default" : isPending ? "secondary" : "destructive";

            return (
                <Badge variant={variant as "default" | "secondary" | "destructive"} className={
                    isCompleted ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200" :
                        isPending ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200" :
                            "bg-red-100 text-red-700 hover:bg-red-100 border-red-200"
                }>
                    {formatPaymentStatus(status)}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: "الإجراءات",
        cell: () => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        className={cn('h-8', 'w-8', 'p-0')}
                    >
                        <span className="sr-only">فتح القائمة</span>
                        <MoreHorizontal className={cn('h-4', 'w-4')} />
                    </Button>
                </div>
            );
        },
    },
];

export function PaymentTable({ data }: PaymentTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
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
        <div className={cn('w-full', 'space-y-4')}>
            {/* Table Container */}
            <div className={cn('rounded-xl', 'border', 'border-gray-200', 'bg-white', 'overflow-hidden', 'shadow-sm')}>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className={cn('text-right', 'py-4', 'font-bold', 'text-gray-700')}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className={cn('group', 'border-b', 'border-gray-100', 'last:border-0', 'hover:bg-blue-50/30', 'transition-colors')}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className={cn('text-right', 'py-4')}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className={cn('h-32', 'text-center', 'text-muted-foreground')}>
                                        <div className={cn('flex', 'flex-col', 'items-center', 'justify-center', 'space-y-2')}>
                                            <CreditCard className={cn('h-8', 'w-8', 'text-gray-300')} />
                                            <p>لا توجد عمليات دفع متاحة</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            <div className={cn('flex', 'items-center', 'justify-between', 'px-2')}>
                <div className={cn('flex-1', 'text-sm', 'text-muted-foreground')}>
                    {table.getFilteredSelectedRowModel().rows.length} من{" "}
                    {table.getFilteredRowModel().rows.length} صف محدد.
                </div>
                <div className={cn('flex', 'items-center', 'space-x-2', 'space-x-reverse', 'gap-2')}>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className={cn('transition-all', 'hover:bg-blue-50', 'hover:text-blue-600')}
                    >
                        السابق
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className={cn('transition-all', 'hover:bg-blue-50', 'hover:text-blue-600')}
                    >
                        التالي
                    </Button>
                </div>
            </div>
        </div>
    );
}
