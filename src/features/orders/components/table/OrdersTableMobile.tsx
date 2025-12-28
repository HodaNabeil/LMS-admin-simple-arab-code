import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { Table as TableType } from '@tanstack/react-table';
import type { Order } from "../../types";

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
                                    <div className="font-medium">Order #{row.getValue("id")}</div>
                                    <div className="text-sm text-gray-500">{row.getValue("date")}</div>
                                    <div className="text-sm">
                                        {row.getValue("Amount")} {row.getValue("Currency")}
                                    </div>
                                    <div className="text-sm">
                                        Status: {row.getValue("Status")}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-blue-600"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-red-600"
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
