import type { Table as TableType } from '@tanstack/react-table';
import type { Order } from "@/types/orders";
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
                                        {new Date(row.original.createdAt).toLocaleDateString("ar-EG")}
                                    </div>
                                    <div className={cn('text-sm', 'font-bold')}>
                                        {row.original.total} {row.original.currency}
                                    </div>
                                    <div className="text-sm">
                                        <Badge variant="default" className={cn('text-[10px]', 'py-0')}>
                                            {row.original.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className={cn('flex', 'gap-2')}>
                                <EditOrder
                                    orderId={row.original.id}
                                    initialData={{
                                        userId: row.original.userId,
                                        courseId: row.original.items[0]?.courseId || "",
                                        coursePriceCents: row.original.items[0]?.priceCents || 0,
                                        currency: row.original.currency || "EGP",
                                        couponId: row.original.couponId || "",
                                        discountCents: row.original.discountCents || 0,
                                        taxCents: row.original.taxCents || 0,
                                    }}
                                />
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
