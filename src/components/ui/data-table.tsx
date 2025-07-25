import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import React from "react";
import Select from "react-select";
import { Button } from "../ui/button";

// أنواع البيانات
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm text-gray-700">
      <table className="min-w-full text-xs divide-y divide-gray-100 rounded-xl overflow-hidden border border-gray-100">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    className="py-1.5 px-2 text-center text-[11px] font-semibold tracking-wide text-gray-700 cursor-pointer select-none hover:bg-gray-100 transition rounded"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <span className="flex items-center justify-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {isSorted && (
                          <svg
                            width="10"
                            height="10"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d={
                                isSorted === "asc"
                                  ? "M7 14l5-5 5 5"
                                  : "M7 10l5 5 5-5"
                              }
                              stroke="#2563eb"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="transition hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-2 py-1 text-center whitespace-nowrap text-[12px]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-t border-gray-100 text-[11px]">
        <div className="text-gray-400">
          {table.getFilteredRowModel().rows.length} of{" "}
          {table.getPrePaginationRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex items-center gap-1.5">
          {[
            { label: "<<", action: () => table.setPageIndex(0), disabled: !table.getCanPreviousPage() },
            { label: "<", action: table.previousPage, disabled: !table.getCanPreviousPage() },
            { label: ">", action: table.nextPage, disabled: !table.getCanNextPage() },
            { label: ">>", action: () => table.setPageIndex(table.getPageCount() - 1), disabled: !table.getCanNextPage() },
          ].map(({ label, action, disabled }, idx) => (
            <button
              key={idx}
              className="px-1.5 py-0.5 text-[11px] border border-gray-200 rounded disabled:opacity-40 hover:bg-gray-100 transition"
              onClick={action}
              disabled={disabled}
            >
              {label}
            </button>
          ))}

          <span className="text-[11px]">
            صفحة {table.getState().pagination.pageIndex + 1} من{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------- Filters Component ----------
interface FilterOptions {
  category: Array<{ label: string; value: string }>;
  teacher: Array<{ label: string; value: string }>;
}

interface FiltersProps {
  options: FilterOptions;
  onFilter: (
    key: keyof FilterOptions,
    value: { label: string; value: string } | null
  ) => void;
  onReset: () => void;
  isLoading: boolean;
  resultCount: number;
}

const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    boxShadow: state.isFocused ? "0 0 0 2px #2563eb22" : "none",
    borderColor: state.isFocused ? "#2563eb" : "#e5e7eb",
    minHeight: 32,
    fontSize: 13,
    borderRadius: 8,
  }),
  option: (base: any, state: any) => ({
    ...base,
    fontSize: 13,
    backgroundColor: state.isSelected
      ? "#2563eb"
      : state.isFocused
      ? "#f1f5f9"
      : undefined,
    color: state.isSelected ? "#fff" : "#222",
  }),
  placeholder: (base: any) => ({ ...base, fontSize: 13, color: "#888" }),
  singleValue: (base: any) => ({ ...base, fontSize: 13 }),
  input: (base: any) => ({ ...base, fontSize: 13 }),
};

export function Filters({
  options,
  onFilter,
  onReset,
  isLoading,
  resultCount,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 p-2 mb-3 bg-gray-50 rounded-lg">
      <Select
        options={options.category}
        className="min-w-[150px] text-xs"
        placeholder="اختر التصنيف"
        isClearable
        onChange={(val) => onFilter("category", val)}
        styles={customSelectStyles}
      />
      <Select
        options={options.teacher}
        className="min-w-[150px] text-xs"
        placeholder="اختر المدرب"
        isClearable
        onChange={(val) => onFilter("teacher", val)}
        styles={customSelectStyles}
      />

      <Button
        className="h-8 px-3 text-xs text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        onClick={() => onFilter("category", null)}
        disabled={isLoading}
      >
        {isLoading ? "...جاري التصفية" : "تصفية"}
      </Button>

      <Button
        variant="outline"
        className="h-8 px-2 text-xs border-gray-300 rounded"
        onClick={onReset}
        disabled={isLoading}
      >
        إعادة تعيين
      </Button>

      <span className="ml-2 text-xs text-gray-500">{resultCount} نتيجة</span>
    </div>
  );
}
