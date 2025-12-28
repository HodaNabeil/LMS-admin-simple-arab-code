import { BookOpen, TrendingUp, Layers } from "lucide-react";
import type { Path } from "@/types/path";

interface PathStatsProps {
    paths: Path[];
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change?: string;
    changeType?: "positive" | "negative";
}

function StatCard({ title, value, icon, change, changeType }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
                    {change && (
                        <p
                            className={`text-sm mt-2 flex items-center gap-1 ${changeType === "positive" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            <TrendingUp className="w-4 h-4" />
                            {change}
                        </p>
                    )}
                </div>
                <div className="text-blue-600">{icon}</div>
            </div>
        </div>
    );
}

function PathStats({ paths }: PathStatsProps) {
    const totalPaths = paths.length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const newPathsThisMonth = paths.filter((path) => {
        const createdAt = new Date(path.createdAt);
        return (
            createdAt.getMonth() === currentMonth &&
            createdAt.getFullYear() === currentYear
        );
    }).length;


    const totalCoursesInPaths = 0;

    const stats = [
        {
            title: "إجمالي المسارات",
            value: totalPaths,
            icon: <Layers className="w-8 h-8" />,
            change: `+${newPathsThisMonth} مسارات جديدة هذا الشهر`,
            changeType: "positive" as const,
        },
        {
            title: "مسارات جديدة",
            value: newPathsThisMonth,
            icon: <TrendingUp className="w-8 h-8" />,
            change: "هذا الشهر",
            changeType: "positive" as const,
        },
        {
            title: "إجمالي الدورات في المسارات",
            value: totalCoursesInPaths,
            icon: <BookOpen className="w-8 h-8" />,
            change: "تحتاج لتحديث الـ API",
            changeType: "positive" as const,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    change={stat.change}
                    changeType={stat.changeType}
                />
            ))}
        </div>
    );
}

export default PathStats;
