import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ coursesCount }: { coursesCount: number }) {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            الدورات التدريبية
          </span>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-sm font-medium border border-blue-300 shadow-sm">
          الدورات ({coursesCount})
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to={`/${Routes.ADMIN}/${Pages.CREATE_COURSES}`}
          className={buttonVariants()}
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة دورة جديدة
        </Link>
      </div>
    </div>
  );
}
