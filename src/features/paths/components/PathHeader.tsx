import { buttonVariants } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/shared/PageHeader";
import { Routes } from "@/constants/enums";

export default function PathHeader() {
  return (
    <PageHeader
      title="المسارات التعليمية"
      icon={Users}
    >
      <Link
        to={`/${Routes.ADMIN}/${Routes.PATHS}/create`}
        className={buttonVariants()}
      >
        <Plus className="w-4 h-4 mr-2" />
        إضافة مسار جديد
      </Link>
    </PageHeader>
  );
}
