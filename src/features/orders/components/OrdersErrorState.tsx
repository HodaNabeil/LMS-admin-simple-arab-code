import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrdersErrorStateProps {
  message?: string;
}

export function OrdersErrorState({ message }: OrdersErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-6 text-center space-y-4 bg-red-50 rounded-xl border border-red-100 m-4">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
        <ShoppingCart className="w-6 h-6 text-red-600" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-red-900">
          حدث خطأ أثناء تحميل الطلبات
        </h3>
        <p className="text-red-700 max-w-xs mx-auto">
          {message || "فشل الاتصال بالخادم. يرجى المحاولة مرة أخرى لاحقاً."}
        </p>
      </div>
      <Button
        variant="outline"
        className="bg-white hover:bg-red-50 border-red-200 text-red-700 font-semibold"
        onClick={() => window.location.reload()}
      >
        إعادة المحاولة
      </Button>
    </div>
  );
}
