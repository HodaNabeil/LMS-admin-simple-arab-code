import * as React from "react"
import {
  Home,
  ChevronDown,
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
  PanelLeft,
  PanelRight,
  Search,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Routes, Pages } from "@/constants/enums"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const data = {
  navMain: [
    {
      title: "لوحة التحكم الرئيسية",
      url: `/${Routes.ADMIN}`,
      icon: Home,
      isActive: true,
    },
    {
      title: "إدارة الدورات",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "جميع الدورات",
          url: `/${Routes.ADMIN}/${Pages.COURSES}`,
          icon: BookOpen,
        },
        {
          title: "إضافة دورة جديدة",
          url: `/${Routes.ADMIN}/${Pages.CREATE_COURSES}`,
          icon: Plus,
        },
        {
          title: "حالة الدورات",
          url: `/${Routes.ADMIN}/${Pages.COURSES}/status`,
          icon: PlayCircle,
        },
      ],
    },
    {
      title: "إدارة المسارات التعليمية",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "جميع المسارات التعليمية",
          url: `/${Routes.ADMIN}/${Routes.PATHS}`,
          icon: FileText,
        },
        {
          title: "إضافة مسار جديد",
          url: `/${Routes.ADMIN}/${Routes.PATHS}/create`,
          icon: Plus,
        },
      ],
    },
    {
      title: "إدارة التراك",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "جميع التراك",
          url: `/${Routes.ADMIN}/${Routes.TRACKS}`,
          icon: FileText,
        },
        {
          title: "إضافة تراك جديد",
          url: `/${Routes.ADMIN}/${Routes.CREATE_TRACKS}`,
          icon: Plus,
        },
      ],
    },
    {
      title: "إدارة المحتوى",
      url: "#",
      icon: FolderOpen,
      items: [
        {
          title: "إدارة الفيديوهات",
          url: `/${Routes.ADMIN}/${Pages.CONTENT}/${Pages.VIDEOS}`,
          icon: FileVideo,
        },
        {
          title: "إدارة الملفات والمرفقات",
          url: `/${Routes.ADMIN}/${Pages.CONTENT}/${Pages.FILES}`,
          icon: FolderOpen,
        },
      ],
    },
    {
      title: "التحليلات والتقارير",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "إحصائيات عامة",
          url: `/${Routes.ADMIN}/${Pages.ANALYTICS}/${Pages.GENERAL}`,
          icon: PieChart,
        },
        {
          title: "تقارير المبيعات",
          url: `/${Routes.ADMIN}/${Pages.ANALYTICS}/${Pages.SALES}`,
          icon: TrendingUp,
        },
        {
          title: "تقارير الطلبات",
          url: `/${Routes.ADMIN}/${Pages.ANALYTICS}/${Pages.ORDERS}`,
          icon: ShoppingCart,
        },
        {
          title: "تقارير المستخدمين",
          url: `/${Routes.ADMIN}/${Pages.ANALYTICS}/${Pages.USERS}`,
          icon: Users,
        },
      ],
    },
    {
      title: "إدارة المستخدمين",
      url: "#",
      icon: Users,
      items: [
        {
          title: "جميع المستخدمين",
          url: `/${Routes.ADMIN}/${Pages.USERS}`,
          icon: Users,
        },
        {
          title: "صلاحيات المشرفين",
          url: `/${Routes.ADMIN}/${Pages.USERS}/admins`,
          icon: UserCheck,
        },
      ],
    },
    {
      title: "إدارة الطلبات والمدفوعات",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "جميع الطلبات",
          url: `/${Routes.ADMIN}/${Pages.ORDERS}`,
          icon: ShoppingCart,
        },
        {
          title: "المدفوعات والمعاملات المالية",
          url: `/${Routes.ADMIN}/${Pages.PAYMENTS}`,
          icon: CreditCard,
        },
        {
          title: "سجل المرتجعات",
          url: `/${Routes.ADMIN}/${Pages.REFUNDS}`,
          icon: RotateCcw,
        },
      ],
    },
    {
      title: "إدارة الكوبونات والخصومات",
      url: "#",
      icon: Ticket,
      items: [
        {
          title: "جميع الكوبونات",
          url: `/${Routes.ADMIN}/${Pages.COUPONS}`,
          icon: Ticket,
        },
        {
          title: "إضافة كوبون جديد",
          url: `/${Routes.ADMIN}/${Pages.COUPONS}/create`,
          icon: Plus,
        },
      ],
    },
    {
      title: "إدارة المراجعات والتعليقات",
      url: "#",
      icon: Star,
      items: [
        {
          title: "جميع المراجعات",
          url: `/${Routes.ADMIN}/${Pages.REVIEWS}`,
          icon: Star,
        },
        {
          title: "جميع التعليقات",
          url: `/${Routes.ADMIN}/${Pages.COMMENTS}`,
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "إدارة الرسائل والإشعارات",
      url: "#",
      icon: Mail,
      items: [
        {
          title: "إعداد رسائل البريد الإلكتروني",
          url: `/${Routes.ADMIN}/${Pages.MESSAGES}/${Pages.EMAIL}`,
          icon: Mail,
        },
        {
          title: "إعداد الإشعارات داخل المنصة",
          url: `/${Routes.ADMIN}/${Pages.MESSAGES}/${Pages.NOTIFICATIONS}`,
          icon: Bell,
        },
      ],
    },
    {
      title: "الإعدادات",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "إعدادات المنصة",
          url: `/${Routes.ADMIN}/${Pages.SETTINGS}/${Routes.PLATFORM}`,
          icon: Wrench,
        },
        {
          title: "إعدادات الدفع",
          url: `/${Routes.ADMIN}/${Pages.SETTINGS}/${Routes.PAYMENT}`,
          icon: DollarSign,
        },
        {
          title: "إعدادات اللغة والمنطقة الزمنية",
          url: `/${Routes.ADMIN}/${Pages.SETTINGS}/${Routes.LOCALE}`,
          icon: Globe,
        },
        {
          title: "إعدادات الحماية",
          url: `/${Routes.ADMIN}/${Pages.SETTINGS}/${Routes.SECURITY}`,
          icon: Shield,
        },
      ],
    },
    {
      title: "إدارة الفريق",
      url: "#",
      icon: UserCog,
      items: [
        {
          title: "إدارة الأعضاء والمشرفين",
          url: `/${Routes.ADMIN}/${Pages.TEAM}/${Pages.MEMBERS}`,
          icon: UserCog,
        },
        {
          title: "دعوة عضو جديد",
          url: `/${Routes.ADMIN}/${Pages.TEAM}/${Pages.INVITE}`,
          icon: UserPlus,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const { state, toggleSidebar } = useSidebar()

  const isActivePath = (href: string) => {
    if (href === `/${Routes.ADMIN}`) {
      return location.pathname === `/${Routes.ADMIN}`
    }
    return location.pathname.startsWith(href)
  }

  return (
    <Sidebar collapsible="icon" side="right" {...props}>
      <SidebarHeader className="border-b border-sidebar-border bg-white">
        <div className="flex flex-col gap-4 p-4 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 px-1">
              <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <BookOpen className="size-5" />
              </div>
              <div
                className={cn(
                  "grid flex-1 text-right text-sm leading-tight transition-opacity duration-200",
                  state === "collapsed" && "opacity-0"
                )}
              >
                <span className="truncate font-bold text-base text-foreground">
                  أكاديمية العرب
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  لوحة التحكم
                </span>
              </div>
            </div>
            <SidebarMenuButton
              onClick={toggleSidebar}
              className="size-9 text-muted-foreground hover:bg-blue-50 hover:text-primary rounded-lg transition-colors"
              tooltip={state === "collapsed" ? "توسيع" : "طي"}
            >
              {state === "collapsed" ? (
                <PanelRight className="size-5" />
              ) : (
                <PanelLeft className="size-5" />
              )}
            </SidebarMenuButton>
          </div>
          <div className={cn(
            "relative transition-opacity duration-200",
            state === "collapsed" && "opacity-0 h-0 overflow-hidden"
          )}>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <SidebarInput
              placeholder="البحث في القائمة..."
              className="pr-9 h-11 bg-muted/30 border-none focus-visible:ring-primary/20"
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup className="py-6">
          <SidebarGroupLabel className="text-muted-foreground/50 font-medium px-8 py-4 text-xs tracking-wider">
            القائمة الرئيسية
          </SidebarGroupLabel>
          <SidebarMenu className="mx-3.5 gap-1 py-2">
            {data.navMain.map((item) => (
              <React.Fragment key={item.title}>
                {item.items ? (
                  <Collapsible
                    asChild
                    defaultOpen={item.items.some((sub) => isActivePath(sub.url))}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      {state === "collapsed" ? (
                        <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          className={cn(
                            "w-full justify-between h-auto px-6 py-4 text-right rounded-xl transition-all duration-200 group/btn",
                            item.items.some((sub) => isActivePath(sub.url))
                              ? "bg-blue-50 text-primary"
                              : "text-foreground hover:bg-blue-50 hover:text-primary"
                          )}
                        >
                          <Link to={item.items[0].url} className="flex items-center gap-4 w-full">
                            {item.icon && (
                              <item.icon
                                className={cn(
                                  "size-5 transition-colors shrink-0",
                                  item.items.some((sub) => isActivePath(sub.url))
                                    ? "text-primary"
                                    : "text-muted-foreground group-hover/btn:text-primary"
                                )}
                              />
                            )}
                            <span className="font-medium text-base flex-1 text-right">
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      ) : (
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={cn(
                              "w-full justify-between h-auto px-6 py-4 text-right rounded-xl transition-all duration-200 group/btn",
                              item.items.some((sub) => isActivePath(sub.url))
                                ? "bg-blue-50 text-primary"
                                : "text-foreground hover:bg-blue-50 hover:text-primary"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              {item.icon && (
                                <item.icon
                                  className={cn(
                                    "size-5 transition-colors shrink-0",
                                    item.items.some((sub) => isActivePath(sub.url))
                                      ? "text-primary"
                                      : "text-muted-foreground group-hover/btn:text-primary"
                                  )}
                                />
                              )}
                              <span className="font-medium text-base">
                                {item.title}
                              </span>
                            </div>
                            <ChevronDown className="mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 size-4" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      )}
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-8 mt-1 gap-1 py-2 mx-3.5 border-none p-0">
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActivePath(subItem.url)}
                                className={cn(
                                  "w-full justify-start h-auto px-6 py-3 text-right rounded-lg transition-all duration-200 group/sub",
                                  isActivePath(subItem.url)
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "text-foreground hover:bg-blue-50 hover:text-primary"
                                )}
                              >
                                <Link
                                  to={subItem.url}
                                  className="flex items-center gap-4 w-full"
                                >
                                  {subItem.icon && (
                                    <subItem.icon
                                      className={cn(
                                        "size-4 transition-colors shrink-0",
                                        isActivePath(subItem.url)
                                          ? "text-white"
                                          : "text-muted-foreground group-hover/sub:text-primary"
                                      )}
                                    />
                                  )}
                                  <span className="font-medium text-sm flex-1 text-right">
                                    {subItem.title}
                                  </span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActivePath(item.url)}
                      tooltip={item.title}
                      className={cn(
                        "w-full justify-start h-auto px-6 py-4 text-right rounded-xl transition-all duration-200 group/single",
                        isActivePath(item.url)
                          ? "bg-primary text-white hover:bg-primary/90 shadow-md"
                          : "text-foreground hover:bg-blue-50 hover:text-primary"
                      )}
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-4 w-full"
                      >
                        {item.icon && (
                          <item.icon
                            className={cn(
                              "size-5 transition-colors shrink-0",
                              isActivePath(item.url)
                                ? "text-white"
                                : "text-muted-foreground group-hover/single:text-primary"
                            )}
                          />
                        )}
                        <span className="font-medium text-base flex-1 text-right">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </React.Fragment>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2 border-t border-sidebar-border p-4">
        {/* Could add user profile here */}
      </SidebarFooter>
    </Sidebar>
  )
}
