import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { flexRender, type Table as TableType } from '@tanstack/react-table';

// Define the interface locally if not imported
interface Course {
    id: number;
    title: string;
    category: string;
    type: string;
    level: string;
    instructor: string;
    price: number;
    image: string;
    students?: number;
    rating?: number;
}

interface CourseTableDesktopProps {
    table: TableType<Course>;
}

export function CourseTableDesktop({ table }: CourseTableDesktopProps) {
    return (
        <div className="hidden lg:block rounded-lg border border-gray-200 bg-white overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="border-b border-gray-200"
                        >
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="text-right font-semibold text-gray-700 py-4"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="text-right py-4">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={table.getAllColumns().length}
                                className="h-24 text-center text-gray-500"
                            >
                                لا توجد نتائج.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
