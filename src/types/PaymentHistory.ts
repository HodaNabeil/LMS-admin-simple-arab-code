export  type Invoice = {
  id: string;
  userId: string;
  courseId: string;
  pricePaidInCents: number;
  createdAt: string; // يمكن تغييره إلى Date إذا كنت ستقوم بتحويله لاحقًا
  updatedAt: string;
  discountCodeId: string | null;
  status: 'PAID' | 'UNPAID' | 'PENDING' | string; // عدل القيم حسب الحالات المتوقعة
  currency: 'USD' | 'EGP' | 'EUR' | string; // أضف باقي العملات المحتملة
  paymentMethod: 'STRIPE' | 'PAYPAL' | 'CASH' | string; // أضف وسائل الدفع الأخرى المحتملة
  paymentIntentId: string;
};

export type InvoicesResponse = {
  invoices: Invoice[];
};
