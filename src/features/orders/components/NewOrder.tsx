import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const cursors = [
  {
    id: 1,
    name: "Html",
  },
  {
    id: 2,
    name: "css",
  },
  {
    id: 3,
    name: "JavaScript",
  },
];
const users = [
  {
    id: 1,
    name: "أحمد محمد",
  },
  {
    id: 2,
    name: "سارة علي",
  },
  {
    id: 3,
    name: "محمد حسن",
  },
];
export function NewOrder() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">طلب جديد</Button>
      </DialogTrigger>
      <DialogContent dir="rtl" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">إضافة طلب جديد</DialogTitle>
          <DialogDescription className="text-right">
            أضف طلبًا جديدًا فقط للمستخدمين الذين يدفعون نقدًا
          </DialogDescription>
        </DialogHeader>

        <form>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input
                type="number"
                min="0"
                step="1"
                name="pricePaidInCents"
                placeholder="السعر (بالسنت)"
                className="text-gray-900 font-bold placeholder:text-gray-500"
              />
            </div>
            <div className="grid gap-3">
              <Input
                name="discountCodeId"
                placeholder="كود الخصم"
                className="text-gray-900 font-bold placeholder:text-gray-500"
              />
            </div>
            <div className="grid gap-3">
              <select
                name="orderStatus"
                className="rounded-md border px-3 py-2 bg-transparent text-gray-900 font-bold"
              >
                <option value="">اختر حالة الطلب</option>
                <option value="PAID">مدفوع</option>
                <option value="UNPAID">غير مدفوع</option>
              </select>
            </div>
            <div className="grid gap-3">
              <select
                name="paymentMethod"
                className="rounded-md border px-3 py-2 bg-transparent text-gray-900 font-bold"
              >
                <option value="">اختر طريقة الدفع</option>
                <option value="PHONE_CASH">دفع نقدي عبر الجوال</option>
                <option value="CARD">بطاقة بنكية</option>
                <option value="APPLE_PAY">Apple Pay</option>
                <option value="STC_PAY">STC Pay</option>
                <option value="STRIPE">Stripe</option>
              </select>
            </div>
            <div className="grid gap-3">
              <select
                name="currency"
                className="rounded-md border px-3 py-2 bg-transparent text-gray-900 font-bold"
              >
                <option value="">اختر العملة</option>
                <option value="EGP">جنيه مصري (EGP)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
                <option value="USD">دولار أمريكي (USD)</option>
              </select>
            </div>

            <div className="grid gap-3">
              <select
                name="currency"
                className="rounded-md border px-3 py-2 bg-transparent text-gray-900 font-bold"
              >
                <option value="">اختر الدورة</option>
                {cursors.map((cursor) => (
                  <option key={cursor.id} value={cursor.name}>
                    {cursor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-3">
              <select
                name="currency"
                className="rounded-md border px-3 py-2 bg-transparent text-gray-900 font-bold"
              >
                <option value="">اختر المستخدم</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <Button type="submit">إضافة الطلب</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
