import { DataTable } from "@/components/ui/data-table";
import type { Coupon } from "@/types/course";
import { getColumns } from "./columns";

interface CouponsTableProps {
  coupons: Coupon[];
  onDelete: (id: string) => void;
  onEdit: (coupon: Coupon) => void;
  isLoading?: boolean;
  courseId?: string;
}

export default function CouponsTable({
  coupons,
  onDelete,
  onEdit,
  isLoading = false,
  courseId,
}: CouponsTableProps) {

  const columns = getColumns({
    onEdit,
    onDelete,
    courseId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-muted-foreground">جاري التحميل...</div>
      </div>
    );
  }

  if ((!coupons || coupons.length === 0) && !isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-muted-foreground">لا يوجد كوبونات</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <DataTable columns={columns} data={coupons} />
    </div>
  );
}
