import { cn } from "../../../../lib/utils";

interface CouponFormHeaderProps {
    title: string;
    description: string;
    showAutoSave?: boolean;
}

export function CouponFormHeader({ title, description, showAutoSave = false }: CouponFormHeaderProps) {
    return (
        <div className={cn('text-center', 'space-y-2', 'mb-6')}>
            <h2 className={cn('text-2xl', 'font-bold', 'text-foreground')}>{title}</h2>
            <p className="text-muted-foreground">{description}</p>

            {showAutoSave && (
                <div className={cn('flex', 'items-center', 'justify-center', 'gap-2', 'text-sm', 'text-muted-foreground')}>
                    <div className={cn('w-2', 'h-2', 'bg-green-500', 'rounded-full', 'animate-pulse')}></div>
                    <span>يتم حفظ البيانات تلقائياً</span>
                </div>
            )}
        </div>
    );
}
