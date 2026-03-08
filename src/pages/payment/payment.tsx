import { PageHeader } from "@/components/shared/PageHeader";
import { PaymentTable } from "@/features/payments/components/payment-table";
import { useMemo, useState } from "react";
import { Loader } from "@/components/shared/loader";
import { CreditCard, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/shared/stats-card";
import { usePayments } from "@/features/payments/hooks/usePaymentsQueries";
import { cn } from "../../lib/utils";
import { CreatePayment } from "./create";

export default function Payment() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const { data: response, isPending, error, isError } = usePayments();

    const invoices = useMemo(() => response?.data?.data || [], [response?.data?.data]);

    const filteredInvoices = useMemo(() => {
        return invoices.filter((invoice) => {
            const matchesSearch = !searchTerm || invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [invoices, searchTerm, statusFilter]);

    const totalRevenue = useMemo(() => {
        return invoices
            .filter(inv => inv.status === "SUCCEEDED")
            .reduce((sum, inv) => sum + (inv.amountCents / 100), 0);
    }, [invoices]);

    const pendingCount = useMemo(() => {
        return invoices.filter(inv => inv.status === "PENDING" || inv.status === "PROCESSING").length;
    }, [invoices]);

    if (isPending) return (
        <div className={cn('flex', 'h-screen', 'items-center', 'justify-center')}>
            <Loader />
        </div>
    );

    if (isError && error) {
        return (
            <div className={cn('flex', 'flex-col', 'items-center', 'justify-center', 'min-h-100', 'p-6', 'text-center', 'space-y-4', 'bg-red-50', 'rounded-xl', 'border', 'border-red-100', 'm-4')}>
                <div className={cn('w-12', 'h-12', 'bg-red-100', 'rounded-full', 'flex', 'items-center', 'justify-center')}>
                    <AlertCircle className={cn('w-6', 'h-6', 'text-red-600')} />
                </div>
                <div className="space-y-2">
                    <h3 className={cn('text-lg', 'font-bold', 'text-red-900')}>حدث خطأ أثناء تحميل سجل المدفوعات</h3>
                    <p className={cn('text-red-700', 'max-w-xs', 'mx-auto')}>
                        {error.message || "فشل الاتصال بالخادم. يرجى المحاولة مرة أخرى لاحقاً."}
                    </p>
                </div>
                <Button
                    variant="outline"
                    className={cn('bg-white', 'hover:bg-red-50', 'border-red-200', 'text-red-700', 'font-semibold')}
                    onClick={() => window.location.reload()}
                >
                    إعادة المحاولة
                </Button>
            </div>
        );
    }

    return (
        <div className={cn('space-y-8', 'p-6')}>
            <PageHeader
                title="إدارة المدفوعات"
                icon={CreditCard}
                badge={
                    <div className={cn('bg-linear-to-r', 'from-blue-600', 'to-indigo-600', 'text-white', 'px-4', 'py-1.5', 'rounded-full', 'text-xs', 'font-semibold', 'shadow-md', 'border', 'border-blue-400/20', 'animate-in', 'fade-in', 'slide-in-from-top-1', 'duration-500')}>
                        {invoices.length} فواتير
                    </div>
                }
            >
                <CreatePayment />
            </PageHeader>

            {/* Stats Overview */}
            <div className={cn('grid', 'gap-4', 'md:grid-cols-2', 'lg:grid-cols-3')}>
                <StatsCard
                    title="إجمالي الإيرادات"
                    value={`${totalRevenue.toLocaleString()} $`}
                    icon={<DollarSign className={cn('h-4', 'w-4', 'text-green-600')} />}
                    growthPercentage={12}
                    iconClassName="bg-green-100"
                />
                <StatsCard
                    title="العمليات المعلقة"
                    value={pendingCount.toString()}
                    icon={<TrendingUp className={cn('h-4', 'w-4', 'text-yellow-600')} />}
                    growthPercentage={0}
                    iconClassName="bg-yellow-100"
                />
                <StatsCard
                    title="إجمالي العمليات"
                    value={invoices.length.toString()}
                    icon={<CreditCard className={cn('h-4', 'w-4', 'text-blue-600')} />}
                    growthPercentage={0}
                    iconClassName="bg-blue-100"
                />
            </div>

            <div className={cn('bg-white', 'rounded-2xl', 'border', 'border-gray-100', 'p-6', 'shadow-sm', 'space-y-6')}>
                <div className={cn('flex', 'flex-col', 'md:flex-row', 'md:items-center', 'justify-between', 'gap-4')}>
                    <div className={cn('relative', 'flex-1', 'max-w-sm')}>
                        <input
                            type="text"
                            placeholder="البحث برقم العملية..."
                            className={cn('w-full', 'pl-4', 'pr-10', 'py-2', 'rounded-xl', 'border', 'border-gray-200', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500/20', 'focus:border-blue-500', 'transition-all')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className={cn('flex', 'items-center', 'gap-2')}>
                        <select
                            className={cn('bg-white', 'border', 'border-gray-200', 'text-gray-900', 'text-sm', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500/20', 'focus:border-blue-500', 'block', 'px-4', 'py-2.5', 'min-w-[140px]', 'hover:bg-gray-50', 'transition-all', 'cursor-pointer', 'shadow-sm')}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">كل الحالات</option>
                            <option value="COMPLETED">مدفوعة</option>
                            <option value="PENDING">قيد الانتظار</option>
                            <option value="FAILED">فاشلة</option>
                        </select>
                    </div>
                </div>

                <PaymentTable data={filteredInvoices} />
            </div>
        </div>
    )
}


