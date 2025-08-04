import {
  BarChart3,
  Bell,
  BookOpen,
  CreditCard,
  DollarSign,
  FileText,
  FileVideo,
  FolderOpen,
  Globe,
  HomeIcon,
  Mail,
  MessageSquare,
  MoreHorizontal,
  PieChart,
  PlayCircle,
  Plus,
  RotateCcw,
  Settings,
  Shield,
  ShoppingCart,
  Star,
  Ticket,
  TrendingUp,
  UserCheck,
  UserCog,
  UserPlus,
  Wrench,
  Users,
  Home,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React, { useState } from "react";

// Menu items.

const items = [
  {
    id: "dashboard",
    title: "لوحة التحكم الرئيسية",
    href: "/",
    icon: <Home className="w-5 h-5" />,
  },
  {
    id: "coursesManagement",
    title: "إدارة الدورات",
    icon: <BookOpen className="w-5 h-5" />,
    isExpandable: true,
    subItems: [
      {
        id: "all-courses",
        title: "جميع الدورات",
        href: "/admin/courses",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        id: "add-course",
        title: "إضافة دورة جديدة",
        href: "/admin/courses/create",
        icon: <Plus className="w-4 h-4" />,
      },
      {
        id: "courses-status",
        title: "حالة الدورات",
        href: "/courses/status",
        icon: <PlayCircle className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "pathsManagement",
    title: "إدارة المسارات التعليمية",
    icon: <FileText className="w-5 h-5" />,
    isExpandable: true,
    subItems: [
      {
        id: "all-paths",
        title: "جميع المسارات التعليمية",
        href: "/admin/paths",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        id: "add-path",
        title: "إضافة مسار جديد",
        href: "/admin/paths/create", // <-- الصحيح
        icon: <Plus className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "contentManagement",
    title: "إدارة المحتوى",
    icon: <FolderOpen className="w-5 h-5" />,
    isExpandable: true,
    subItems: [
      {
        id: "video-management",
        title: "إدارة الفيديوهات",
        href: "/content/videos",
        icon: <FileVideo className="w-4 h-4" />,
      },
      {
        id: "files-management",
        title: "إدارة الملفات والمرفقات",
        href: "/content/files",
        icon: <FolderOpen className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "analyticsReports",
    title: "التحليلات والتقارير",
    icon: <BarChart3 className="w-5 h-5" />,
    isExpandable: true,
    subItems: [
      {
        id: "general-stats",
        title: "إحصائيات عامة",
        href: "/admin/analytics",
        icon: <PieChart className="w-4 h-4" />,
      },
      {
        id: "sales-reports",
        title: "تقارير المبيعات",
        href: "/analytics/sales",
        icon: <TrendingUp className="w-4 h-4" />,
      },
      {
        id: "orders-reports",
        title: "تقارير الطلبات",
        href: "/analytics/orders",
        icon: <ShoppingCart className="w-4 h-4" />,
      },
      {
        id: "users-reports",
        title: "تقارير المستخدمين",
        href: "/analytics/users",
        icon: <Users className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "userManagement",
    title: "إدارة المستخدمين",
    icon: <Users className="w-5 h-5" />,
    isExpandable: true,
    subItems: [
      {
        id: "all-users",
        title: "جميع المستخدمين",
        href: "/admin/users",
        icon: <Users className="w-4 h-4" />,
      },
      {
        id: "admin-permissions",
        title: "صلاحيات المشرفين",
        href: " /admin/users/admins",
        icon: <UserCheck className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "ordersPayments",
    title: "إدارة الطلبات والمدفوعات",
    icon: <ShoppingCart className="w-5 h-5" />,
    isExpandable: true,
    subItems: [
      {
        id: "all-orders",
        title: "جميع الطلبات",
        href: "/orders",
        icon: <ShoppingCart className="w-4 h-4" />,
      },
      {
        id: "payments",
        title: "المدفوعات والمعاملات المالية",
        href: "/payments",
        icon: <CreditCard className="w-4 h-4" />,
      },
      {
        id: "refunds",
        title: "سجل المرتجعات",
        href: "/refunds",
        icon: <RotateCcw className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "couponsManagement",
    title: "إدارة الكوبونات والخصومات",
    icon: <Ticket className="w-5 h-5" />,
    isExpandable: true,
    subItems: [
      {
        id: "all-coupons",
        title: "جميع الكوبونات",
        href: "/coupons",
        icon: <Ticket className="w-4 h-4" />,
      },
      {
        id: "add-coupon",
        title: "إضافة كوبون جديد",
        href: "/coupons/create",
        icon: <Plus className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "reviewsFeedback",
    title: "إدارة المراجعات والتعليقات",
    icon: <Star className="w-5 h-5" />,
    isExpandable: true,
    subItems: [
      {
        id: "all-reviews",
        title: "جميع المراجعات",
        href: "/reviews",
        icon: <Star className="w-4 h-4" />,
      },
      {
        id: "all-comments",
        title: "جميع التعليقات",
        href: "/comments",
        icon: <MessageSquare className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "messagesNotifications",
    title: "إدارة الرسائل والإشعارات",
    icon: <Mail className="w-5 h-5" />,
    isExpandable: true,
    subItems: [
      {
        id: "email-settings",
        title: "إعداد رسائل البريد الإلكتروني",
        href: "/messages/email",
        icon: <Mail className="w-4 h-4" />,
      },
      {
        id: "notification-settings",
        title: "إعداد الإشعارات داخل المنصة",
        href: "/messages/notifications",
        icon: <Bell className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "settings",
    title: "الإعدادات",
    icon: <Settings className="w-5 h-5" />,
    isExpandable: true,
    subItems: [
      {
        id: "platform-settings",
        title: "إعدادات المنصة",
        href: "/settings/platform",
        icon: <Wrench className="w-4 h-4" />,
      },
      {
        id: "payment-settings",
        title: "إعدادات الدفع",
        href: "/settings/payment",
        icon: <DollarSign className="w-4 h-4" />,
      },
      {
        id: "locale-settings",
        title: "إعدادات اللغة والمنطقة الزمنية",
        href: "/settings/locale",
        icon: <Globe className="w-4 h-4" />,
      },
      {
        id: "security-settings",
        title: "إعدادات الحماية",
        href: "/settings/security",
        icon: <Shield className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "teamManagement",
    title: "إدارة الفريق",
    icon: <UserCog className="w-5 h-5" />,
    isExpandable: true,
    subItems: [
      {
        id: "team-members",
        title: "إدارة الأعضاء والمشرفين",
        href: "/team/members",
        icon: <UserCog className="w-4 h-4" />,
      },
      {
        id: "invite-member",
        title: "دعوة عضو جديد",
        href: "/team/invite",
        icon: <UserPlus className="w-4 h-4" />,
      },
    ],
  },
];
export function AppSidebar() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <Sidebar side="right" className="w-64">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <React.Fragment key={item.title}>
                  <SidebarMenuItem>
                    {item.subItems ? (
                      <button
                        type="button"
                        onClick={() => handleToggle(item.id)}
                        className="w-full flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-blue-50 justify-between"
                      >
                        <span className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.title}</span>
                        </span>
                        <span
                          className={`transition-transform ${
                            openItem === item.id ? "rotate-90" : "rotate-0"
                          }`}
                        >
                          ▶
                        </span>
                      </button>
                    ) : (
                      <SidebarMenuButton asChild>
                        <a
                          href={item.href || "#"}
                          className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-blue-50"
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                  {item.subItems && openItem === item.id && (
                    <div className="ml-6 border-r border-gray-200 pl-2 flex flex-col gap-1">
                      {item.subItems.map((sub) => (
                        <a
                          key={sub.title}
                          href={sub.href || "#"}
                          className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-blue-50"
                        >
                          {sub.icon}
                          <span>{sub.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
