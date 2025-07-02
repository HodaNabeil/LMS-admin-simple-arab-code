import {
  Link,
  useLocation,
} from "react-router-dom";
import {
  Home,
  ChevronDown,
  X,
  BookOpen,
  PlayCircle,
  Plus,
  BarChart3,
  TrendingUp,
  ShoppingCart,
  Users,
  CreditCard,
  Ticket,
  MessageSquare,
  Star,
  Mail,
  Bell,
  Settings,
  Shield,
  Globe,
  UserPlus,
  FileVideo,
  FolderOpen,
  PieChart,
  FileText,
  UserCheck,
  DollarSign,
  RotateCcw,
  Wrench,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarSubItem {
  id: string;
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  comingSoon?: boolean;
}

interface SidebarItem {
  id: string;
  title: string;
  href?: string;
  icon: React.ReactNode;
  badge?: string;
  comingSoon?: boolean;
  isExpandable?: boolean;
  subItems?: SidebarSubItem[];
}

interface SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

function Sidebar({
  isMobile = false,
  isOpen = true,
  onClose,
}: SidebarProps) {
  const location = useLocation();
  const [
    expandedItems,
    setExpandedItems,
  ] = useState<string[]>([]);

  const toggleExpanded = (
    itemId: string
  ) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter(
            (id) => id !== itemId
          )
        : [...prev, itemId]
    );
  };

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      title: "لوحة التحكم الرئيسية",
      href: "/",
      icon: (
        <Home className="w-5 h-5" />
      ),
    },
    {
      id: "coursesManagement",
      title: "إدارة الدورات",
      icon: (
        <BookOpen className="w-5 h-5" />
      ),
      isExpandable: true,
      subItems: [
        {
          id: "all-courses",
          title: "جميع الدورات",
          href: "/courses",
          icon: (
            <BookOpen className="w-4 h-4" />
          ),
        },
        {
          id: "add-course",
          title: "إضافة دورة جديدة",
          href: "/courses/create",
          icon: (
            <Plus className="w-4 h-4" />
          ),
        },
        {
          id: "courses-status",
          title: "حالة الدورات",
          href: "/courses/status",
          icon: (
            <PlayCircle className="w-4 h-4" />
          ),
        },
      ],
    },
    {
      id: "pathsManagement",
      title: "إدارة المسارات التعليمية",
      icon: (
        <FileText className="w-5 h-5" />
      ),
      isExpandable: true,
      subItems: [
        {
          id: "all-paths",
          title:
            "جميع المسارات التعليمية",
          href: "/learning-paths",
          icon: (
            <FileText className="w-4 h-4" />
          ),
        },
        {
          id: "add-path",
          title: "إضافة مسار جديد",
          href: "/learning-paths/create",
          icon: (
            <Plus className="w-4 h-4" />
          ),
        },
      ],
    },
    {
      id: "contentManagement",
      title: "إدارة المحتوى",
      icon: (
        <FolderOpen className="w-5 h-5" />
      ),
      isExpandable: true,
      subItems: [
        {
          id: "video-management",
          title: "إدارة الفيديوهات",
          href: "/content/videos",
          icon: (
            <FileVideo className="w-4 h-4" />
          ),
        },
        {
          id: "files-management",
          title:
            "إدارة الملفات والمرفقات",
          href: "/content/files",
          icon: (
            <FolderOpen className="w-4 h-4" />
          ),
        },
      ],
    },
    {
      id: "analyticsReports",
      title: "التحليلات والتقارير",
      icon: (
        <BarChart3 className="w-5 h-5" />
      ),
      isExpandable: true,
      subItems: [
        {
          id: "general-stats",
          title: "إحصائيات عامة",
          href: "/analytics/general",
          icon: (
            <PieChart className="w-4 h-4" />
          ),
        },
        {
          id: "sales-reports",
          title: "تقارير المبيعات",
          href: "/analytics/sales",
          icon: (
            <TrendingUp className="w-4 h-4" />
          ),
        },
        {
          id: "orders-reports",
          title: "تقارير الطلبات",
          href: "/analytics/orders",
          icon: (
            <ShoppingCart className="w-4 h-4" />
          ),
        },
        {
          id: "users-reports",
          title: "تقارير المستخدمين",
          href: "/analytics/users",
          icon: (
            <Users className="w-4 h-4" />
          ),
        },
      ],
    },
    {
      id: "userManagement",
      title: "إدارة المستخدمين",
      icon: (
        <Users className="w-5 h-5" />
      ),
      isExpandable: true,
      subItems: [
        {
          id: "all-users",
          title: "جميع المستخدمين",
          href: "/admin/users",
          icon: (
            <Users className="w-4 h-4" />
          ),
        },
        {
          id: "admin-permissions",
          title: "صلاحيات المشرفين",
          href: "/users/admins",
          icon: (
            <UserCheck className="w-4 h-4" />
          ),
        },
      ],
    },
    {
      id: "ordersPayments",
      title: "إدارة الطلبات والمدفوعات",
      icon: (
        <ShoppingCart className="w-5 h-5" />
      ),
      isExpandable: true,
      subItems: [
        {
          id: "all-orders",
          title: "جميع الطلبات",
          href: "/orders",
          icon: (
            <ShoppingCart className="w-4 h-4" />
          ),
        },
        {
          id: "payments",
          title:
            "المدفوعات والمعاملات المالية",
          href: "/payments",
          icon: (
            <CreditCard className="w-4 h-4" />
          ),
        },
        {
          id: "refunds",
          title: "سجل المرتجعات",
          href: "/refunds",
          icon: (
            <RotateCcw className="w-4 h-4" />
          ),
        },
      ],
    },
    {
      id: "couponsManagement",
      title:
        "إدارة الكوبونات والخصومات",
      icon: (
        <Ticket className="w-5 h-5" />
      ),
      isExpandable: true,
      subItems: [
        {
          id: "all-coupons",
          title: "جميع الكوبونات",
          href: "/coupons",
          icon: (
            <Ticket className="w-4 h-4" />
          ),
        },
        {
          id: "add-coupon",
          title: "إضافة كوبون جديد",
          href: "/coupons/create",
          icon: (
            <Plus className="w-4 h-4" />
          ),
        },
      ],
    },
    {
      id: "reviewsFeedback",
      title:
        "إدارة المراجعات والتعليقات",
      icon: (
        <Star className="w-5 h-5" />
      ),
      isExpandable: true,
      subItems: [
        {
          id: "all-reviews",
          title: "جميع المراجعات",
          href: "/reviews",
          icon: (
            <Star className="w-4 h-4" />
          ),
        },
        {
          id: "all-comments",
          title: "جميع التعليقات",
          href: "/comments",
          icon: (
            <MessageSquare className="w-4 h-4" />
          ),
        },
      ],
    },
    {
      id: "messagesNotifications",
      title: "إدارة الرسائل والإشعارات",
      icon: (
        <Mail className="w-5 h-5" />
      ),
      isExpandable: true,
      subItems: [
        {
          id: "email-settings",
          title:
            "إعداد رسائل البريد الإلكتروني",
          href: "/messages/email",
          icon: (
            <Mail className="w-4 h-4" />
          ),
        },
        {
          id: "notification-settings",
          title:
            "إعداد الإشعارات داخل المنصة",
          href: "/messages/notifications",
          icon: (
            <Bell className="w-4 h-4" />
          ),
        },
      ],
    },
    {
      id: "settings",
      title: "الإعدادات",
      icon: (
        <Settings className="w-5 h-5" />
      ),
      isExpandable: true,
      subItems: [
        {
          id: "platform-settings",
          title: "إعدادات المنصة",
          href: "/settings/platform",
          icon: (
            <Wrench className="w-4 h-4" />
          ),
        },
        {
          id: "payment-settings",
          title: "إعدادات الدفع",
          href: "/settings/payment",
          icon: (
            <DollarSign className="w-4 h-4" />
          ),
        },
        {
          id: "locale-settings",
          title:
            "إعدادات اللغة والمنطقة الزمنية",
          href: "/settings/locale",
          icon: (
            <Globe className="w-4 h-4" />
          ),
        },
        {
          id: "security-settings",
          title: "إعدادات الحماية",
          href: "/settings/security",
          icon: (
            <Shield className="w-4 h-4" />
          ),
        },
      ],
    },
    {
      id: "teamManagement",
      title: "إدارة الفريق",
      icon: (
        <UserCog className="w-5 h-5" />
      ),
      isExpandable: true,
      subItems: [
        {
          id: "team-members",
          title:
            "إدارة الأعضاء والمشرفين",
          href: "/team/members",
          icon: (
            <UserCog className="w-4 h-4" />
          ),
        },
        {
          id: "invite-member",
          title: "دعوة عضو جديد",
          href: "/team/invite",
          icon: (
            <UserPlus className="w-4 h-4" />
          ),
        },
      ],
    },
  ];

  const isActivePath = (
    href: string
  ) => {
    if (href === "/admin") {
      return (
        location.pathname === "/admin"
      );
    }
    return location.pathname.startsWith(
      href
    );
  };

  const renderSidebarItem = (
    item: SidebarItem
  ) => {
    if (
      item.isExpandable &&
      item.subItems
    ) {
      const isExpanded =
        expandedItems.includes(item.id);
      const hasActiveSubItem =
        item.subItems.some(
          (subItem) =>
            subItem.href &&
            isActivePath(subItem.href)
        );

      return (
        <li
          key={item.id}
          className="space-y-1"
        >
          {/* Parent Item */}
          <Button
            variant="ghost"
            onClick={() =>
              toggleExpanded(item.id)
            }
            className={cn(
              "w-full justify-between h-auto px-4 py-3 text-right rounded-xl transition-all duration-200 group",
              hasActiveSubItem ||
                isExpanded
                ? "bg-blue-50 text-primary"
                : "text-foreground hover:bg-blue-50 hover:text-primary"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "transition-colors",
                  hasActiveSubItem ||
                    isExpanded
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                )}
              >
                {item.icon}
              </div>
              <span className="font-medium">
                {item.title}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isExpanded
                  ? "rotate-180"
                  : "rotate-0",
                hasActiveSubItem ||
                  isExpanded
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
          </Button>

          {/* Sub Items */}
          {isExpanded && (
            <div className="ml-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
              {item.subItems.map(
                (subItem) => (
                  <div key={subItem.id}>
                    {subItem.comingSoon ? (
                      <div
                        className={cn(
                          "flex items-center justify-between w-full px-4 py-2 text-right rounded-lg transition-colors",
                          "text-muted-foreground bg-gray-50 cursor-not-allowed"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-gray-400">
                            {
                              subItem.icon
                            }
                          </div>
                          <span className="font-medium text-sm">
                            {
                              subItem.title
                            }
                          </span>
                        </div>
                        {subItem.badge && (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
                          >
                            {
                              subItem.badge
                            }
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={
                          subItem.href!
                        }
                        onClick={
                          isMobile
                            ? onClose
                            : undefined
                        }
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-between h-auto px-4 py-2 text-right rounded-lg transition-all duration-200 group",
                            isActivePath(
                              subItem.href!
                            )
                              ? "bg-primary text-white hover:bg-primary/90"
                              : "text-foreground hover:bg-blue-50 hover:text-primary"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "transition-colors",
                                isActivePath(
                                  subItem.href!
                                )
                                  ? "text-white group-hover:text-foreground"
                                  : "text-muted-foreground group-hover:text-primary"
                              )}
                            >
                              {
                                subItem.icon
                              }
                            </div>
                            <span className="font-medium text-sm">
                              {
                                subItem.title
                              }
                            </span>
                          </div>
                        </Button>
                      </Link>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </li>
      );
    }

    // Regular item (non-expandable)
    if (item.comingSoon) {
      return (
        <div
          key={item.id}
          className={cn(
            "flex items-center justify-between w-full px-4 py-3 text-right rounded-xl transition-colors",
            "text-muted-foreground bg-gray-50 cursor-not-allowed"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="text-gray-400">
              {item.icon}
            </div>
            <span className="font-medium">
              {item.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {item.badge && (
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
              >
                {item.badge}
              </Badge>
            )}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.href!}
        onClick={
          isMobile ? onClose : undefined
        }
      >
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between h-auto px-4 py-3 text-right rounded-xl transition-all duration-200 group",
            isActivePath(item.href!)
              ? "bg-primary text-white hover:bg-primary/90 shadow-md"
              : "text-foreground hover:bg-blue-50 hover:text-primary"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "transition-colors",
                isActivePath(item.href!)
                  ? ""
                  : "text-muted-foreground group-hover:text-primary"
              )}
            >
              {item.icon}
            </div>
            <span className="font-medium">
              {item.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {item.badge &&
              !isActivePath(
                item.href!
              ) && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  {item.badge}
                </Badge>
              )}
          </div>
        </Button>
      </Link>
    );
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">
            القائمة
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      <nav className="p-4">
        <ul className="flex flex-col gap-2">
          {sidebarItems.map((item) =>
            renderSidebarItem(item)
          )}
        </ul>
      </nav>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={cn(
            "fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 lg:hidden",
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          )}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside className="w-80 bg-white border-l border-border h-full overflow-y-auto hidden lg:block">
      {sidebarContent}
    </aside>
  );
}

export default Sidebar;
