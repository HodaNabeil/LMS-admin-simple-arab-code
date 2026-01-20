import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import DeletePath from "../DeletePath";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import type { Path } from "@/types/path";

// Type-safe column definition that enforces accessorKey matches Path properties
type PathColumnDef = ColumnDef<Path, unknown> & {
  accessorKey?: keyof Path;
};

export const columns: PathColumnDef[] = [
  {
    accessorKey: "thumbnailUrl",
    header: "الصورة",
    cell: ({ row }) => (
      <div>
        <img
          src={row.getValue("thumbnailUrl") || "/placeholder-image.jpg"}
          alt={row.getValue("title")}
          className="h-12 w-12 rounded-lg object-cover"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: "اسم المسار",
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <div className="font-medium text-right truncate">
          {row.getValue("title")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="bg-purple-100 text-purple-800 border-purple-200"
      >
        {row.getValue("slug")}
      </Badge>
    ),
  },
  {
    accessorKey: "description",
    header: "وصف المسار (بالتفاصيل)",
    cell: ({ row }) => (
      <p className="text-foreground truncate max-w-64">
        {row.getValue("description")}
      </p>
    ),
  },
  {
    accessorKey: "summary",
    header: "العنوان",
    cell: ({ row }) => (
      <p className="text-foreground truncate max-w-64">
        {row.getValue("summary")}
      </p>
    ),
  },

  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: ({ row }) => {
      const path = row.original;
      return (
        <div className="flex gap-2 items-center">
          <Link to={`/admin/paths/${path.slug}/manage`}>
            <Edit className="h-4 w-4 text-blue-600 hover:text-blue-800" />
          </Link>
          <DeletePath pathSlug={path.slug} />
        </div>
      );
    },
  },
] satisfies ColumnDef<Path>[];
