import { useAdminPaymentHistory } from "@/features/stats/hooks/useAdminPaymentHistory";
import PaymentTable from "./PaymentTable";
import { Loader } from "@/components/shared/loader";

export default function PaymentHistory() {
  const { data, isError, isLoading, error } = useAdminPaymentHistory();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        {error?.message || "حدث خطأ أثناء تحميل البيانات"}
      </div>
    );
  }

  return !isLoading && data && <PaymentTable invoices={data?.invoices} />;
}
