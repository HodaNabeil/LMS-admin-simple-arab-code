import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Table as TableType } from '@tanstack/react-table';
import type { Order } from "../../types";
import { Badge } from "@/components/ui/badge";
import EditOrder from "../edit-order";
import { cn } from "../../../../lib/utils";

interface OrdersTableMobileProps {
    table: TableType<Order>;
}

export function OrdersTableMobile({ table }: OrdersTableMobileProps) {
    return (
        <div className={cn('block', 'lg:hidden', 'space-y-4')}>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <div
                        key={row.id}
                        className={cn('bg-white', 'rounded-lg', 'border', 'border-gray-200', 'p-4', 'space-y-3')}
                    >
                        <div className={cn('flex', 'items-start', 'gap-3')}>
                            <div className={cn('flex-1', 'min-w-0')}>

                                <div className={cn('grid', 'gap-1')}>
                                    <div className={cn('font-medium', 'text-blue-600')}>
                                        #{row.getValue("orderNumber")}
                                    </div>
                                    <div className={cn('text-sm', 'text-gray-500')}>
                                        {new Date().toLocaleDateString("ar-EG")}
                                    </div>
                                    <div className={cn('text-sm', 'font-bold')}>
                                        {(row.original.totalCents / 100).toFixed(2)} {row.original.currency}
                                    </div>
                                    <div className="text-sm">
                                        <Badge variant="default" className={cn('text-[10px]', 'py-0')}>
                                            PAID
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className={cn('flex', 'gap-2')}>
                                <EditOrder
                                    orderId={row.original.userId}
                                    initialData={{
                                        user: { value: row.original.userId, label: row.original.userId },
                                        courses: row.original.items.map((item) => ({
                                            value: item.courseId,
                                            label: item.courseId,
                                        })),
                                        currency: { value: row.original.currency || "EGP", label: row.original.currency || "EGP" },
                                        coupon: row.original.couponCode ? { value: row.original.couponCode, label: row.original.couponCode } : null,
                                        subtotalCents: row.original.subtotalCents || 0,
                                        discountCents: row.original.discountCents || 0,
                                        taxCents: row.original.taxCents || 0,
                                        totalCents: row.original.totalCents || 0,
                                        couponCode: row.original.couponCode,
                                    }}
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn('h-8', 'w-8', 'p-0', 'text-red-600', 'hover:text-red-800', 'hover:bg-red-50')}
                                >
                                    <Trash2 className={cn('h-4', 'w-4')} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className={cn('text-center', 'py-8', 'text-muted-foreground')}>
                    لا توجد نتائج.
                </div>
            )}
        </div>
    );
}
