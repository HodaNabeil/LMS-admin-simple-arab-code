import { flexRender, type Table } from '@tanstack/react-table';
import { type Review } from '@/types/reviews';
import { cn } from "@/lib/utils";

interface ReviewTableMobileProps {
  table: Table<Review>;
}

export function ReviewTableMobile({ table }: ReviewTableMobileProps) {
  return (
    <div className={cn('md:hidden', 'space-y-4')}>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className={cn('bg-white', 'p-4', 'rounded-lg', 'border', 'border-gray-200', 'space-y-3', 'shadow-sm')}
          >
            {row.getVisibleCells().map((cell) => {
              // Skip id column if it's visible but we don't want to show it in mobile cards
              if (cell.column.id === 'id') return null;
              
              return (
                <div key={cell.id} className={cn('flex', 'flex-col', 'space-y-1')}>
                  <span className={cn('text-xs', 'font-medium', 'text-gray-500')}>
                    {typeof cell.column.columnDef.header === 'string' 
                      ? cell.column.columnDef.header 
                      : cell.column.id}
                  </span>
                  <div className={cn('text-sm')}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              );
            })}
          </div>
        ))
      ) : (
        <div className={cn('text-center', 'py-8', 'bg-white', 'rounded-lg', 'border', 'border-gray-200')}>
          لا يوجد نتائج.
        </div>
      )}
    </div>
  );
}
