import { DataTable } from "@/components/ui/data-table";
import type { Coupon } from "@/types/course";
import { getColumns } from "./columns";

interface CouponsTableProps {
  coupons: Coupon[];
  onDelete: (id: string) => void;
  onEdit: (coupon: Coupon) => void;
  isLoading?: boolean;
}

export default function CouponsTable({
  coupons,
  onDelete,
  onEdit,
  isLoading = false,
}: CouponsTableProps) {

  const columns = getColumns({
    onEdit,
    onDelete,
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
        <div className="text-muted-foreground">No coupons found.</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <DataTable columns={columns} data={coupons} />
    </div>
  );
}
