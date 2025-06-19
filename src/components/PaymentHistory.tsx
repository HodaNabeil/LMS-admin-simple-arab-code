import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

// بيانات تجريبية (استبدليها ببيانات حقيقية من API عند الحاجة)
const paymentData = [
  {
    id: "فاتورة-001",
    date: "2024-06-01",
    amount: "120 ر.س",
    method: "بطاقة ائتمان",
    status: "مدفوع",
  },
  {
    id: "فاتورة-002",
    date: "2024-06-05",
    amount: "80 ر.س",
    method: "مدى",
    status: "قيد المعالجة",
  },
  // ... بيانات أخرى
];

export default function PaymentHistory() {
  return (
    <Card className="bg-white text-gray-800 rounded-lg border-0 shadow-md" dir="rtl">
      <CardHeader>
        <CardTitle className="text-base font-bold text-gray-800">سجل المدفوعات</CardTitle>
        <CardDescription className="text-gray-500">يمكنك الوصول لجميع فواتيرك السابقة.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="text-gray-800 font-bold">رقم الفاتورة</TableHead>
              <TableHead className="text-gray-800 font-bold">التاريخ</TableHead>
              <TableHead className="text-gray-800 font-bold">المبلغ</TableHead>
              <TableHead className="text-gray-800 font-bold">طريقة الدفع</TableHead>
              <TableHead className="text-gray-800 font-bold">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentData.map((item) => (
              <TableRow key={item.id} className="border-gray-200">
                <TableCell className="text-gray-800 font-medium">{item.id}</TableCell>
                <TableCell className="text-gray-800 font-medium">{item.date}</TableCell>
                <TableCell className="text-gray-800 font-medium">{item.amount}</TableCell>
                <TableCell className="text-gray-800 font-medium">{item.method}</TableCell>
                <TableCell className="text-gray-800 font-medium">{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 