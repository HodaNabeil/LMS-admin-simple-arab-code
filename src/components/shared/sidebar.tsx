import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Settings,
  Users,
  FolderOpen,
  Briefcase,
  Megaphone,
  Wallet,
  User,
  BarChart3,
  Bot,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "لوحة التحكم",
    icon: <Home className="w-5 h-5" />,
    href: "/dashboard",
  },
  {
    id: "system-control",
    label: "التحكم بالنظام",
    icon: <Settings className="w-5 h-5" />,
    href: "/system-control",
  },
  {
    id: "users",
    label: "قاعدة المستخدمين",
    icon: <Users className="w-5 h-5" />,
    href: "/users",
  },
  {
    id: "content",
    label: "إدارة المحتوى",
    icon: <FolderOpen className="w-5 h-5" />,
    href: "/content",
  },
  {
    id: "students",
    label: "حقيبة الطلاب",
    icon: <Briefcase className="w-5 h-5" />,
    href: "/students",
    badge: 2,
  },
  {
    id: "marketing",
    label: "التسويق",
    icon: <Megaphone className="w-5 h-5" />,
    href: "/marketing",
  },
  {
    id: "wallet",
    label: "المحفظة",
    icon: <Wallet className="w-5 h-5" />,
    href: "/wallet",
  },
  {
    id: "profile",
    label: "الملف الشخصي",
    icon: <User className="w-5 h-5" />,
    href: "/profile",
  },
  {
    id: "reports",
    label: "التقارير والإحصائيات",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "/reports",
  },
];

interface SidebarProps {
  isCollapsed?: boolean;
}

function Sidebar({ isCollapsed = false }: SidebarProps = {}) {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <aside className="w-full bg-white h-screen overflow-y-auto cairo-font border-r border-gray-200">
      <div className="p-6">
        {/* User Profile Section */}
        <div className="flex items-center gap-3 mb-8">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="محمد محمد" />
            <AvatarFallback className="bg-gray-200 text-gray-600">م م</AvatarFallback>
          </Avatar>
          <span className="font-bold text-lg text-gray-800 cairo-font">محمد محمد</span>
        </div>

        {/* Dashboard Button */}
        <div className="mb-6">
          <Button
            variant={isActive("/dashboard") ? "default" : "ghost"}
            className={cn(
              "w-full justify-between text-right h-12 px-4 text-base font-semibold rounded-xl cairo-font",
              isActive("/dashboard") 
                ? "bg-blue-500 text-white hover:bg-blue-600" 
                : "bg-transparent text-gray-700 hover:bg-gray-100"
            )}
            asChild
          >
            <Link to="/dashboard">
              <span className="flex items-center gap-3">
                <Home className="w-5 h-5" />
                لوحة التحكم
              </span>
            </Link>
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.slice(1).map((item) => (
            <div key={item.id} className="relative">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between text-right h-12 px-4 text-base font-medium rounded-lg cairo-font",
                  isActive(item.href)
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                asChild
              >
                <Link to={item.href}>
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>
              </Button>
            </div>
          ))}
        </nav>

        {/* AI Assistant Card */}
        <Card className="mt-8 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 p-6 text-white">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-white/20 rounded-full p-3">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-bold text-lg cairo-font">مساعدك الذكي</h3>
            <p className="text-sm opacity-90 cairo-font">متصل الآن</p>
            <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl h-10 font-medium cairo-font">
              <span className="flex items-center justify-center gap-2">
                تواصل
                <ArrowLeft className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </aside>
  );
}

export default Sidebar;
