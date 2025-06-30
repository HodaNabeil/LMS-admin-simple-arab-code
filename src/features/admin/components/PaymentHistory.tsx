import { useAdminPaymentHistory } from "@/hooks/useAdminPaymentHistory";
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

  if (data ) {
    return <PaymentTable invoices={data?.invoices} />;
  }

  return (
    <div className="text-center py-8 text-gray-500">لا توجد بيانات متاحة حالياً.</div>
  );
}
