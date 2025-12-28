import React, { useMemo, useState } from 'react';
import {
  flexRender,
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

import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { EditUser } from './EditUser';
import DeleteUser from './DeleteUser';
import type { User } from '@/types/user';
import UsersFilters from './UsersFilters';

interface UsersTableProps {
  users: User[];
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },

  {
    accessorKey: 'image',
    header: 'الصورة',
    cell: ({ row }) => {
      return (
        <img
          src={row.getValue('image')}
          alt={row.getValue('name')}
          className="h-12 w-12 rounded-lg object-cover"
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'اسم المستخدم',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return (
        <div className="max-w-[300px]">
          <div className="font-medium text-right truncate">{name}</div>
        </div>
      );
    },
  },

  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'نوعة المستخدم',
    cell: ({ row }) => (
      <Badge variant="outline" className="border-blue-200 text-blue-800">
        {row.getValue('role')}
      </Badge>
    ),
  },

  {
    id: 'actions',
    header: 'الإجراءات',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <button className="text-blue-600 hover:text-blue-800">
          <EditUser user={row.original as User} />
        </button>

        <button className="text-red-600 hover:text-red-800">
          <DeleteUser userId={row.original.id} />
        </button>
      </div>
    ),
  },
];

function UserTable({ users }: UsersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchTerm, setSearchTerm] = useState(''); // قيمة افتراضية فارغة
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return users.filter((user: { id: string; role: string; email: string }) => {
      const matchesSearchId = user.id?.toString().includes(term);
      const matchesSearchEmail = user.email?.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === 'الكل' || user.role === selectedCategory;

      const matchesSearch = matchesSearchId || matchesSearchEmail;

      return matchesSearch && matchesCategory;
    });
  }, [users, searchTerm, selectedCategory]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('الكل');
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
              <div className="flex items-start gap-3">
                {(row.getValue('image') as string) && (
                  <img
                    src={row.getValue('image') as string}
                    alt={row.getValue('name') as string}
                    className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-5 line-clamp-2 text-right">
                    {row.getValue('name')}
                  </h3>
                </div>
                <div className="flex gap-2 items-center">
                  <button className="text-blue-600 hover:text-blue-800">
                    <EditUser user={row.original as User} />
                  </button>

                  <button className="text-red-600 hover:text-red-800">
                    <DeleteUser userId={row.original.id} />
                  </button>
                </div>
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

export default UserTable;
