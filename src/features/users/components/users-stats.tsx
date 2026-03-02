import { Banknote, Users, GraduationCap, TrendingUp } from "lucide-react";
import type { User } from "@/types/user";

interface UsersStatsProps {
    users: User[];
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

function UsersStats({ users }: UsersStatsProps) {
    const totalUsers = users.length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const newUsersThisMonth = users.filter((user) => {
        const createdAt = new Date(user.createdAt);
        return (
            createdAt.getMonth() === currentMonth &&
            createdAt.getFullYear() === currentYear
        );
    }).length;


    const totalCoursesInPaths = 0;

    const stats = [
        {
            title: "إجمالي الإيرادات",
            value: totalUsers,
            icon: <Banknote className="w-8 h-8" />,
            change: `+${newUsersThisMonth} إجمالي الإيرادات هذا الشهر`,
            changeType: "positive" as const,
        },
        {
            title: "إجمالي عدد المسجلين في الدورة",
            value: newUsersThisMonth,
            icon: <Users className="w-8 h-8" />,
            change: "إجمالي عدد المسجلين في الدورة",
            changeType: "positive" as const,
        },
        {
            title: "إجمالي الطلاب",
            value: totalCoursesInPaths,
            icon: <GraduationCap className="w-8 h-8" />,
            change: "إجمالي الطلاب",
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

export default UsersStats;
