import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CreateOrderHeaderProps {
    onCancel: () => void;
}

export const CreateOrderHeader = ({ onCancel }: CreateOrderHeaderProps) => {
    return (
        <div className={cn('bg-white', 'border-b', 'border-gray-200')}>
            <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-6')}>
                <div className={cn('flex', 'items-center', 'justify-between')}>
                    <div>
                        <div className={cn('flex', 'items-center', 'gap-3', 'mb-2')}>
                            <div className={cn('w-8', 'h-8', 'bg-blue-100', 'rounded-lg', 'flex', 'items-center', 'justify-center')}>
                                <svg className={cn('w-5', 'h-5', 'text-blue-600')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h1 className={cn('text-2xl', 'font-bold', 'text-gray-900')}>إضافة طلب جديد</h1>
                        </div>
                        <p className="text-gray-600">أضف طلبًا جديدًا مع دعم كامل للتخفيضات والكوبونات</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        className={cn('flex', 'items-center', 'gap-2', 'hover:bg-gray-50')}
                    >
                        <svg className={cn('w-4', 'h-4')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        إلغاء
                    </Button>
                </div>
            </div>
        </div>
    );
};
