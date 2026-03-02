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
import { Image as ImageIcon, Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import { CourseTableMobile } from './CourseTableMobile';
import { CourseTableDesktop } from './CourseTableDesktop';
import type { Course } from '@/types/course';
import { Link } from 'react-router-dom';
import DeleteCourse from '../DeleteCourse';
import { useMemo } from 'react';
import { cn } from "../../../../lib/utils";

interface CourseTableProps {
  courses: Course[];
}

function CourseTable({ courses }: CourseTableProps) {


  const columns = useMemo<ColumnDef<Course>[]>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      enableHiding: true,
    },
    {
      accessorKey: 'thumbnailUrl',
      header: 'الصورة',
      cell: ({ row }) => {
        const thumbnailUrl = row.getValue('thumbnailUrl') as string;
        return (
          <div className={cn('flex', 'items-center')}>
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={row.getValue('title')}
                className={cn('h-12', 'w-12', 'rounded-lg', 'object-cover')}
              />
            ) : (
              <div className={cn('h-12', 'w-12', 'rounded-lg', 'bg-gray-100', 'flex', 'items-center', 'justify-center')}>
                <ImageIcon className={cn('h-6', 'w-6', 'text-gray-400')} />
              </div>
            )}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'title',
      header: 'اسم الدورة',
      cell: ({ row }) => (
        <div className="max-w-50">
          <div className={cn('font-medium', 'text-right', 'truncate')} title={row.getValue('title')}>
            {row.getValue('title')}
          </div>
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'slug',
      header: 'المعرف الأساسي (Slug)',
      cell: ({ row }) => (
        <div className={cn('font-medium', 'text-right', 'truncate', 'max-w-[120px]')} title={row.getValue('slug')}>
          {row.getValue('slug')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'الحالة',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const statusLabels: Record<string, string> = {
          PUBLISHED: 'منشور',
          DRAFT: 'مسودة',
          ARCHIVED: 'مؤرشف',
        };
        return (
          <Badge variant="outline" className="font-medium">
            {statusLabels[status] || status}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'visibility',
      header: 'الظهور',
      cell: ({ row }) => {
        const visibility = row.getValue('visibility') as string;
        const visibilityLabels: Record<string, string> = {
          PUBLIC: 'عام',
          PRIVATE: 'خاص',
          UNLISTED: 'غير مدرج',
        };
        return (
          <Badge variant="secondary" className="font-normal">
            {visibilityLabels[visibility] || visibility}
          </Badge>
        );
      },
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
      accessorKey: 'price',
      header: 'السعر',
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'));
        const compareAtPrice = row.original.compareAtPrice;
        const currency = row.original.currency || 'ر.س';
        return (
          <div className={cn('font-medium', 'text-right', 'flex', 'flex-col', 'gap-1')}>
            {price === 0 ? (
              <Badge className={cn('bg-green-50', 'text-green-700', 'border-green-200', 'hover:bg-green-100', 'transition-colors')}>مجاني</Badge>
            ) : (
              <div className={cn('flex', 'flex-col')}>
                <span className={cn('text-blue-700', 'font-bold', 'whitespace-nowrap')}>
                  {price} <span className={cn('text-[10px]', 'text-gray-500', 'font-normal')}>{currency}</span>
                </span>
                {compareAtPrice && compareAtPrice > price && (
                  <span className={cn('text-xs', 'text-muted-foreground', 'line-through', 'opacity-60')}>
                    {compareAtPrice} {currency}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'hours',
      header: 'الساعات',
      cell: ({ row }) => (
        <div className="text-right">
          {row.getValue('hours') || 0} س
        </div>
      ),
    },
    {
      accessorKey: 'maxStudents',
      header: 'أقصى طلاب',
      cell: ({ row }) => (
        <div className="text-right">
          {row.getValue('maxStudents') || '∞'}
        </div>
      ),
    },
    {
      accessorKey: 'isFeatured',
      header: 'مميز',
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue('isFeatured') ? '✅' : '❌'}
        </div>
      ),
    },
    {
      accessorKey: 'certificateEnabled',
      header: 'شهادة',
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue('certificateEnabled') ? '✅' : '❌'}
        </div>
      ),
    },
    {
      accessorKey: 'pathId',
      header: 'المسار',
      cell: ({ row }) => (
        <div className={cn('font-medium', 'text-right', 'truncate', 'max-w-[100px]')} title={row.getValue('pathId')}>
          {row.getValue('pathId')}
        </div>
      ),
    },
    {
      accessorKey: 'trackId',
      header: 'التتابع',
      cell: ({ row }) => (
        <div className={cn('font-medium', 'text-right', 'truncate', 'max-w-[100px]')} title={row.getValue('trackId')}>
          {row.getValue('trackId') || '---'}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'تاريخ الإنشاء',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return (
          <div className={cn('text-right', 'text-xs', 'whitespace-nowrap')}>
            {date.toLocaleDateString('ar-SA')}
          </div>
        );
      },
    },
    {
      accessorKey: 'updatedAt',
      header: 'آخر تحديث',
      cell: ({ row }) => {
        const date = new Date(row.getValue('updatedAt'));
        return (
          <div className={cn('text-right', 'text-xs', 'whitespace-nowrap')}>
            {date.toLocaleDateString('ar-SA')}
          </div>
        );
      },
    },
    {
      accessorKey: 'publishedAt',
      header: 'تاريخ النشر',
      cell: ({ row }) => {
        const dateStr = row.getValue('publishedAt') as string;
        const date = dateStr ? new Date(dateStr) : null;
        return (
          <div className={cn('text-right', 'text-xs', 'whitespace-nowrap')}>
            {date ? date.toLocaleDateString('ar-SA') : '---'}
          </div>
        );
      },
    },
    {
      accessorKey: 'lecturesCount',
      header: 'عدد الدروس',
      cell: ({ row }) => (
        <div className="text-right">
          {row.getValue('lecturesCount') || 0}
        </div>
      ),
    },
    {
      accessorKey: 'rating',
      header: 'التقييم',
      cell: ({ row }) => (
        <div className="text-right">
          {row.getValue('rating') || '---'}
        </div>
      ),
    },
    {
      accessorKey: 'ratingCount',
      header: 'عدد التقييمات',
      cell: ({ row }) => (
        <div className="text-right">
          {row.getValue('ratingCount') || 0}
        </div>
      ),
    },
    {
      accessorKey: 'shortDescription',
      header: 'وصف قصير',
      cell: ({ row }) => (
        <div className={cn('max-w-[200px]', 'truncate')} title={row.getValue('shortDescription') as string}>
          {row.getValue('shortDescription') as string || '---'}
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'الوصف',
      cell: ({ row }) => (
        <div className={cn('max-w-[200px]', 'truncate')} title={row.getValue('description')}>
          {row.getValue('description')}
        </div>
      ),
    },
    {
      accessorKey: 'metaTitle',
      header: 'عنوان SEO',
      cell: ({ row }) => (
        <div className={cn('max-w-[150px]', 'truncate')} title={row.getValue('metaTitle')}>
          {row.getValue('metaTitle') || '---'}
        </div>
      ),
    },
    {
      accessorKey: 'metaDescription',
      header: 'وصف SEO',
      cell: ({ row }) => (
        <div className={cn('max-w-[150px]', 'truncate')} title={row.getValue('metaDescription')}>
          {row.getValue('metaDescription') || '---'}
        </div>
      ),
    },
    {
      accessorKey: 'tags',
      header: 'الوسوم',
      cell: ({ row }) => {
        const tags = row.getValue('tags') as string[];
        return (
          <div className={cn('flex', 'flex-wrap', 'gap-1', 'max-w-[150px]')}>
            {tags?.map((tag) => (
              <Badge key={tag} variant="outline" className={cn('text-[10px]', 'px-1', 'py-0')}>{tag}</Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'objectives',
      header: 'الأهداف',
      cell: ({ row }) => {
        const items = row.getValue('objectives') as string[];
        return <div className="text-right">{items?.length || 0} أهداف</div>;
      },
    },
    {
      accessorKey: 'requirements',
      header: 'المتطلبات',
      cell: ({ row }) => {
        const items = row.getValue('requirements') as string[];
        return <div className="text-right">{items?.length || 0} متطلبات</div>;
      },
    },
    {
      accessorKey: 'targetAudience',
      header: 'الجمهور المستهدف',
      cell: ({ row }) => {
        const items = row.getValue('targetAudience') as string[];
        return <div className="text-right">{items?.length || 0} فئات</div>;
      },
    },
    {
      accessorKey: 'instructorId',
      header: 'المعلم',
      enableHiding: true,
    },
    {
      id: 'actions',
      header: 'الإجراءات',
      enableHiding: false,
      cell: ({ row }) => {
        const slug = row.original.slug;
        const title = row.original.title;
        return (
          <div className={cn('flex', 'items-center', 'gap-2')}>
            <Link
              to={`/admin/courses/${slug}/manage/basics`}
              className={cn('text-blue-600', 'hover:text-blue-800')}
            >
              <Edit />
            </Link>
            <DeleteCourse courseSlug={slug} courseTitle={title} />
          </div>
        );
      },
    },
  ], []);
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
