import React from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { CourseTableMobile } from './CourseTableMobile';
import { CourseTableDesktop } from './CourseTableDesktop';
import type { Course } from '@/types/course';
import { cn } from "../../../../lib/utils";
import { columns } from './columns';

interface CourseTableProps {
  courses: Course[];
}

function CourseTable({ courses }: CourseTableProps) {






  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      id: true,
      instructorId: true,
      createdAt: true,
      updatedAt: true,
      maxStudents: true,
      pathId: true,
      trackId: true,
      certificateEnabled: true,
      isFeatured: true,
      publishedAt: true,
      lecturesCount: true,
      rating: true,
      ratingCount: true,
      shortDescription: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      tags: true,
      objectives: true,
      requirements: true,
      targetAudience: true,
    });
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: courses,
    columns: columns,
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
    <div className="w-full">
      <div className={cn('flex', 'flex-col', 'sm:flex-row', 'items-start', 'sm:items-center', 'gap-4', 'py-4')}>
        <Input
          placeholder="البحث في الدورات slug"
          value={(table.getColumn('slug')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('slug')?.setFilterValue(event.target.value)
          }
          className={cn('w-full', 'sm:max-w-sm')}
        />
      </div>

      <CourseTableMobile table={table} />
      <CourseTableDesktop table={table} />

      <div className={cn('flex', 'flex-col', 'sm:flex-row', 'items-center', 'justify-between', 'gap-4', 'py-4')}>
        <div className={cn('text-sm', 'text-muted-foreground')}>
          {table.getFilteredSelectedRowModel().rows.length} من{' '}
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

export default CourseTable;
