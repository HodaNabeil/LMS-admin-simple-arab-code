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
import { Badge } from "@/components/ui/badge";
import { EditUser } from "./EditUser";
import DeleteUser from "./DeleteUser";
import type { User } from "@/types/user";
import UsersFilters from "./UsersFilters";

interface UsersTableProps {
  users: User[];
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-xs text-gray-500 font-mono">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    id: "name",
    header: "الاسم",
    cell: ({ row }) => {
      const firstName = row.original.firstName || "";
      const lastName = row.original.lastName || "";
      const fullName = `${firstName} ${lastName}`.trim() || "---";
      return <div className="font-medium text-right">{fullName}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "البريد الإلكتروني",
  },
  {
    accessorKey: "role",
    header: "الدور",
    cell: ({ row }) => (
      <Badge variant="outline" className="border-blue-200 text-blue-800">
        {row.getValue("role")}
      </Badge>
    ),
  },
  {
    accessorKey: "isActive",
    header: "الحالة",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge
          variant={isActive ? "default" : "destructive"}
          className={
            isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
          }
        >
          {isActive ? "نشط" : "غير نشط"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isEmailVerified",
    header: "توثيق البريد",
    cell: ({ row }) => {
      const isVerified = row.getValue("isEmailVerified") as boolean;
      return (
        <Badge
          variant="secondary"
          className={
            isVerified
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }
        >
          {isVerified ? "موثق" : "غير موثق"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الانضمام",
    cell: ({ row }) => {
      return (
        <div className="text-xs text-gray-500 text-right">
          {new Date(row.getValue("createdAt")).toLocaleDateString("ar-EG")}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <EditUser user={row.original as User} />
        <DeleteUser userId={row.original.id} />
      </div>
    ),
  },
];

function UserTable({ users }: UsersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearchId = user.id?.toString().includes(term);
      const matchesSearchEmail = user.email?.toLowerCase().includes(term);
      const matchesSearchName = `${user.firstName || ""} ${user.lastName || ""}`
        .toLowerCase()
        .includes(term);

      const matchesCategory =
        selectedCategory === "الكل" || user.role === selectedCategory;

      const matchesSearch =
        matchesSearchId || matchesSearchEmail || matchesSearchName;

      return matchesSearch && matchesCategory;
    });
  }, [users, searchTerm, selectedCategory]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("الكل");
  };

  const table = useReactTable({
    data: filteredUsers,
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
      <UsersFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onClearFilters={handleClearFilters}
      />
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm text-right">
                    {row.original.firstName} {row.original.lastName}
                  </h3>
                  <p className="text-xs text-gray-500 text-right">
                    {row.original.email}
                  </p>
                </div>
                <div className="flex gap-1">
                  <EditUser user={row.original as User} />
                  <DeleteUser userId={row.original.id} />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                <Badge variant="outline" className="text-[10px]">
                  {row.original.role}
                </Badge>
                <Badge
                  variant={row.original.isActive ? "default" : "destructive"}
                  className={`text-[10px] ${row.original.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}`}
                >
                  {row.original.isActive ? "نشط" : "غير نشط"}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-[10px] ${row.original.isEmailVerified ? "bg-blue-100 text-blue-800" : ""}`}
                >
                  {row.original.isEmailVerified ? "موثق" : "غير موثق"}
                </Badge>
              </div>
              <div className="text-[10px] text-gray-400 text-right">
                انضم في:{" "}
                {new Date(row.original.createdAt).toLocaleDateString("ar-EG")}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد نتائج.
          </div>
        )}
      </div>

      {/* Desktop Table View */}
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
                            header.getContext(),
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-right py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  لا توجد نتائج.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} من{" "}
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

export default UserTable;
