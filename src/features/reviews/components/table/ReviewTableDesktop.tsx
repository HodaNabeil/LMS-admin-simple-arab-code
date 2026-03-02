import { flexRender, type Table } from '@tanstack/react-table';
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type Review } from '@/types/reviews';
import { cn } from "@/lib/utils";

interface ReviewTableDesktopProps {
  table: Table<Review>;
}

export function ReviewTableDesktop({ table }: ReviewTableDesktopProps) {
  return (
    <div className={cn('hidden', 'lg:block', 'rounded-lg', 'border', 'border-gray-200', 'bg-white', 'overflow-hidden')}>
      <UITable>
        <TableHeader className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className={cn('border-b', 'border-gray-200')}
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn('text-right', 'font-semibold', 'text-gray-700', 'py-4')}
                >
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
                className={cn('border-b', 'border-gray-100', 'hover:bg-gray-50', 'transition-colors')}
                data-state={row.getIsSelected() && 'selected'}
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
              <TableCell
                colSpan={table.getAllColumns().length}
                className={cn('h-24', 'text-center', 'text-gray-500')}
              >
                لا يوجد نتائج.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </UITable>
    </div>
  );
}
