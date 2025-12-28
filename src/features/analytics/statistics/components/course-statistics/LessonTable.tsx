import React, { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface LessonAnalytics {
  id: string;
  name: string;
  course: string;
  instructor: string;
  views: number;
  duration: string;
}

interface LessonTableProps {
  lessons: LessonAnalytics[];
}

const columns: ColumnDef<LessonAnalytics>[] = [
  {
    accessorKey: "name",
    header: "المحاضرة ",
    cell: ({ row }) => (
      <span className="font-semibold text-slate-700">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "course",
    header: "اسم الدورة ",
    cell: ({ row }) => (
      <span className="text-slate-600">{row.getValue("course")}</span>
    ),
  },
  {
    accessorKey: "instructor",
    header: "المسار التعليمي ",
    cell: ({ row }) => (
      <span className="text-slate-500">{row.getValue("instructor")}</span>
    ),
  },
  {
    accessorKey: "views",
    header: "عدد المشاهدات",
    cell: ({ row }) => (
      <span className="font-bold text-emerald-600">
        {row.getValue("views")}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "duration",
    header: "المدة",
    cell: ({ row }) => (
      <span className="text-xs text-slate-500">{row.getValue("duration")}</span>
    ),
    enableSorting: false,
  },
];
export default function LessonTable({ lessons }: LessonTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("الكل");

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      // البحث في اسم الدرس واسم الكورس
      const matchesSearch =
        lesson.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCourse =
        selectedCourse === "الكل" || lesson.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [lessons, searchTerm, selectedCourse]);

  const uniqueCourses = useMemo(() => {
    const courses = [...new Set(lessons.map((lesson) => lesson.course))];
    return ["الكل", ...courses];
  }, [lessons]);

  const table = useReactTable({
    data: filteredLessons,
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
      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="البحث في الدروس..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white"
            >
              {uniqueCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="bg-white rounded-lg border border-slate-200 p-4 space-y-3 shadow-sm"
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-700 text-right">
                  {row.getValue("name")}
                </h3>
                <div className="text-sm text-slate-600 text-right">
                  <span className="font-medium">الكورس:</span>{" "}
                  {row.getValue("course")}
                </div>
                <div className="text-sm text-slate-600 text-right">
                  <span className="font-medium">المدرب:</span>{" "}
                  {row.getValue("instructor")}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">
                    {row.getValue("duration")}
                  </span>
                  <span className="font-bold text-emerald-600">
                    {row.getValue("views")} مشاهدة
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">لا توجد نتائج.</div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-slate-200"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-right font-semibold text-slate-700 py-4"
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
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  data-state={row.getIsSelected() && "selected"}
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
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-500"
                >
                  لا توجد نتائج.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-slate-600">
          {table.getFilteredSelectedRowModel().rows.length} من{" "}
          {table.getFilteredRowModel().rows.length} درس محدد.
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            السابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            التالي
          </Button>
        </div>
      </div>
    </div>
  );
}
