import React from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import { CourseTableMobile } from './CourseTableMobile';
import { CourseTableDesktop } from './CourseTableDesktop';
import { EditCourse } from '../EditCourse';
import type { Course } from '@/types/course';

interface CourseTableProps {
  courses: Course[];
}

const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'thumbnailUrl',
    header: 'الصورة',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <img
          src={row.getValue('thumbnailUrl')}
          alt={row.getValue('title')}
          className="h-12 w-12 rounded-lg object-cover"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'slug',
    header: 'اسم المادة',
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <div className="font-medium text-right truncate">
          {row.getValue('slug')}
        </div>
      </div>
    ),
    enableSorting: true,
  },

  {
    accessorKey: 'level',
    header: 'المستوى',
    cell: ({ row }) => {
      const level = row.getValue('level') as string;
      const levelLabels: Record<string, string> = {
        BEGINNER: 'مبتدئ',
        INTERMEDIATE: 'متوسط',
        ADVANCED: 'متقدم',
        ALL_LEVELS: 'جميع المستويات',
      };

      const levelColors: Record<string, string> = {
        BEGINNER: 'bg-green-100 text-green-800 border-green-200',
        INTERMEDIATE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        ADVANCED: 'bg-red-100 text-red-800 border-red-200',
      };

      return (
        <Badge
          className={`${levelColors[level] ||
            'bg-gray-100 text-gray-800 border-gray-200'
            }`}
        >
          {levelLabels[level] || level}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'instructorId',
    header: 'معرف المدرب',
    cell: ({ row }) => (
      <div className="font-medium text-right truncate max-w-[150px]" title={row.getValue('instructorId')}>
        {row.getValue('instructorId')}
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'السعر',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      return (
        <div className="font-medium text-right">
          {price === 0 ? 'مجاني' : `${price} ر.س`}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'الإجراءات',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <button className="text-blue-600 hover:text-blue-800">
            <EditCourse course={row.original} />
          </button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

function CourseTable({ courses }: CourseTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: courses,
    columns,
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
        <Input
          placeholder="البحث في الدورات..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm"
        />
      </div>

      <CourseTableMobile table={table} />
      <CourseTableDesktop table={table} />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} من{' '}
          {table.getFilteredRowModel().rows.length} صف محدد.
        </div>
        <div className="flex gap-2">
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
