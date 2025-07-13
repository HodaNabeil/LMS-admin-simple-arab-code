import DeleteUser from "@/features/users/components/DeleteUser";
import { EditPath } from "./EditPath";
import { Badge } from "@/components/ui/badge";
import type { Path } from "@/types/path";
import type { ColumnDef } from "@tanstack/react-table";

export const columnsPaths: ColumnDef<Path>[] = [
  {
    accessorKey: "image",
    header: "الصورة",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
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
    header: " المعرف (slug)",
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
      <Badge variant="outline" className="border-blue-200 text-blue-800">
        {row.getValue("description")}
      </Badge>
    ),
  },
  {
    accessorKey: "heading",
    header: "وصف المسار (بالعنوان الرئيسي)",
    cell: ({ row }) => (
      <Badge variant="outline" className="border-blue-200 text-blue-800">
        {row.getValue("heading")}
      </Badge>
    ),
  },

  {
    accessorKey: "roadmapUrl",
    header: "رابط خارطة الطريق",
    cell: ({ row }) => {
      const url = row.getValue("roadmapUrl");
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-700 hover:underline"
        >
          عرض الخارطة
        </a>
      );
    },
  },

  // {
  //   accessorKey: "level",
  //   header: "المستوى",
  //   cell: ({ row }) => {
  //     const level = row.getValue("level") as string;
  //     const levelColors = {
  //       مبتدئ: "bg-green-100 text-green-800 border-green-200",
  //       متوسط: "bg-yellow-100 text-yellow-800 border-yellow-200",
  //       متقدم: "bg-red-100 text-red-800 border-red-200",
  //     };
  //     return (
  //       <Badge
  //         className={`${
  //           levelColors[level as keyof typeof levelColors] ||
  //           "bg-gray-100 text-gray-800 border-gray-200"
  //         }`}
  //       >
  //         {level}
  //       </Badge>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "instructor",
  //   header: "اسم المدرب",
  //   cell: ({ row }) => (
  //     <div className="font-medium text-right">{row.getValue("instructor")}</div>
  //   ),
  // },
  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <button className="text-blue-600 hover:text-blue-800">
          {/* <EditU
          ser user={row.original as User} /> */}
          <EditPath path={row.original as Path} />
        </button>

        <button className="text-red-600 hover:text-red-800">
          <DeleteUser userId={row.original.id as string} />
        </button>
      </div>
    ),
  },
];
