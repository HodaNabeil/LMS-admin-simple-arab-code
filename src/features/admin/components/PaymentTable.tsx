import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatters";

type Invoice = {
  id: string;
  createdAt: string;
  pricePaidInCents: number;
  paymentMethod: string;
  status: string;
};

export default function PaymentTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <Card
      className="bg-white text-gray-800 rounded-lg border-0 shadow-md"
      dir="rtl"
    >
      <CardHeader>
        <CardTitle className="text-base font-bold text-gray-800">
          سجل المدفوعات
        </CardTitle>
        <CardDescription className="text-gray-500">
          يمكنك الوصول لجميع فواتيرك السابقة.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="text-gray-800 font-bold">
                رقم الفاتورة
              </TableHead>
              <TableHead className="text-gray-800 font-bold">التاريخ</TableHead>
              <TableHead className="text-gray-800 font-bold">المبلغ</TableHead>
              <TableHead className="text-gray-800 font-bold">
                طريقة الدفع
              </TableHead>
              <TableHead className="text-gray-800 font-bold">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices?.map((item) => (
              <TableRow key={item.id} className="border-gray-200">
                <TableCell className="text-gray-800 font-medium">
                  {item.id}
                </TableCell>
                <TableCell className="text-gray-800 font-medium">
                  {new Date(item.createdAt).toLocaleDateString("ar-EG")}
                </TableCell>
                <TableCell className="text-gray-800 font-medium">
                  {formatCurrency(item.pricePaidInCents / 100)}
                </TableCell>
                <TableCell className="text-gray-800 font-medium">
                  {item.paymentMethod}
                </TableCell>
                <TableCell className="text-gray-800 font-medium">
                  {item.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
