import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    icon?: LucideIcon;
    description?: string;
    children?: ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    icon: Icon,
    description,
    children,
    className,
}: PageHeaderProps) {
    return (
        <header
            className={cn(
                "flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100",
                className
            )}
        >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                    {Icon && <Icon className="w-5 h-5 text-blue-600" />}
                    <div className="flex flex-col">
                        <h1 className="font-medium text-sm lg:text-base">{title}</h1>
                        {description && (
                            <p className="text-sm text-gray-500">{description}</p>
                        )}
                    </div>
                </div>
            </div>
            {children && <div className="flex items-center gap-4">{children}</div>}
        </header>
    );
}
