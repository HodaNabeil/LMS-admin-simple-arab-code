import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
    title: ReactNode;
    icon?: LucideIcon;
    description?: ReactNode;
    children?: ReactNode;
    className?: string;
    badge?: ReactNode;
}

export function PageHeader({
    title,
    icon: Icon,
    description,
    children,
    className,
    badge,
}: PageHeaderProps) {
    return (
        <header
            className={cn(
                "flex flex-col  sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-2 bg-card p-2 lg:p-4 rounded-2xl shadow-sm border border-app",
                className
            )}
        >
            <div className={cn('flex', 'flex-col', 'sm:flex-row', 'sm:items-center', 'gap-4', 'lg:gap-6')}>
                <div className={cn('flex', 'items-center', 'gap-4', 'text-foreground')}>
                    <div className={cn('p-3', 'bg-app-soft', 'rounded-xl')}>
                        {Icon && <Icon className={cn('w-6', 'h-6', 'text-app')} />}
                    </div>
                    <div className={cn('flex', 'flex-col', 'gap-1')}>
                        <h1 className={cn('font-bold', 'text-xl', 'tracking-tight', 'text-foreground', 'leading-none')}>{title}</h1>
                        {description && (
                            <div className={cn('text-sm', 'text-muted-foreground', 'font-medium')}>{description}</div>
                        )}
                    </div>
                </div>
                {badge}
            </div>
            {children && <div className={cn('flex', 'items-center', 'gap-4')}>{children}</div>}
        </header>
    );
}
