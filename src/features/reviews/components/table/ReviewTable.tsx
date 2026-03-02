import React from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type {
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { ReviewTableMobile } from './ReviewTableMobile';
import { ReviewTableDesktop } from './ReviewTableDesktop';
import { type Review } from '@/types/reviews';
import { cn } from '@/lib/utils';
import { columns } from './colums';

interface ReviewTableProps {
  reviews: Review[];
}

function ReviewTable({ reviews }: ReviewTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable({
    data: reviews,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className={cn('w-full', 'space-y-4')}>
      <ReviewTableMobile table={table} />
      <ReviewTableDesktop table={table} />

      <div className={cn('flex', 'flex-col', 'sm:flex-row', 'items-center', 'justify-between', 'gap-4', 'py-4')}>
        <div className={cn('text-sm', 'text-muted-foreground')}>
          {table.getFilteredSelectedRowModel().rows.length} من{" "}
          {table.getFilteredRowModel().rows.length} صف محدد.
        </div>
        <div className={cn('flex', 'gap-2')}>
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

export default ReviewTable;
