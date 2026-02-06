import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Table as TableType } from '@tanstack/react-table';
import type { Order } from "../../types";
import { Badge } from "@/components/ui/badge";
import EditOrder from "../edit-order";

interface OrdersTableMobileProps {
    table: TableType<Order>;
}

export function OrdersTableMobile({ table }: OrdersTableMobileProps) {
    return (
        <div className="block lg:hidden space-y-4">
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <div
                        key={row.id}
                        className="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">

                                <div className="grid gap-1">
                                    <div className="font-medium text-blue-600">
                                        #{row.getValue("orderNumber")}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(row.original.createdAt).toLocaleDateString("ar-EG")}
                                    </div>
                                    <div className="text-sm font-bold">
                                        {row.original.total} {row.original.currency}
                                    </div>
                                    <div className="text-sm">
                                        <Badge variant={
                                            row.original.status === "PENDING"
                                                ? "secondary"
                                                : row.original.status === "COMPLETED"
                                                    ? "default"
                                                    : "destructive"
                                        } className="text-[10px] py-0">
                                            {row.original.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <EditOrder
                                    orderId={row.original.id}
                                    initialData={{
                                        price: row.original.total,
                                        discountCode: row.original.couponCode || "",
                                        orderStatus: row.original.status ? { value: row.original.status, label: row.original.status } : null,
                                        paymentMethod: row.original.payment?.status
                                            ? { value: row.original.payment.status, label: row.original.payment.status }
                                            : null,
                                        currency: { value: row.original.currency || "EGP", label: row.original.currency || "EGP" },
                                        courses: row.original.items.map((item) => ({
                                            value: item.id,
                                            label: item.courseName,
                                        })),
                                        user: { value: row.original.userId, label: row.original.email },
                                    }}
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    لا توجد نتائج.
                </div>
            )}
        </div>
    );
}
