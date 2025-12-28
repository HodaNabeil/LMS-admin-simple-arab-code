import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import DeletePath from "../DeletePath";
import type { Path } from "@/types/path";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Edit } from "lucide-react";

export const columns: ColumnDef<Path>[] = [
  {
    accessorKey: "image",
    header: "الصورة",
    cell: ({ row }) => (
      <div>
        <img
          src={row.getValue("image")}
          alt={row.getValue("name")}
          className="h-12 w-12 roundend-lg object-cover"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "اسم المسار",
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <div className="font-medium text-right truncate">
          {row.getValue("name")}
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
    accessorKey: "heading",
    header: "العنوان",
    cell: ({ row }) => (
      <p className="text-foreground truncate max-w-64">
        {row.getValue("heading")}
      </p>
    ),
  },

  {
    accessorKey: "roadmapUrl",
    header: "رابط خارطة الطريق",
    cell: ({ row }) => (
      <Link
        to="/"
        target="_blank"
        className={buttonVariants({ variant: "link" })}
      >
        {row.getValue("roadmapUrl")}
      </Link>
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
];
