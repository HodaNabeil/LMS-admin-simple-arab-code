import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import DeletePath from "../DeletePath";
import { Pages, Routes } from "@/constants/enums";
import type { Table as TableType } from '@tanstack/react-table';
import type { Path } from "@/types/path";

interface PathTableMobileProps {
    table: TableType<Path>;
}

export function PathTableMobile({ table }: PathTableMobileProps) {
    return (
        <div className="block lg:hidden space-y-4">
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <div
                        key={row.id}
                        className="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
                    >
                        <div className="flex items-start gap-3">
                            <img
                                src={row.getValue("image")}
                                alt={row.getValue("name")}
                                className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-sm leading-5 line-clamp-2 text-right">
                                    {row.getValue("name")}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 text-right">
                                    {row.getValue("slug")}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    to={`/${Routes.ADMIN}/${Pages.PATHS}/${row.original.slug}/${Pages.MANAGE}`}
                                >
                                    <Edit className="h-4 w-4 text-blue-600 hover:text-blue-800" />
                                </Link>
                                <DeletePath pathSlug={row.original.slug} />
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
