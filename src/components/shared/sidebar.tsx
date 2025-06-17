import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarItem {
  name: string;
  section?: string;
  href?: string;
}

interface SidebarSection {
  title: string;
  section?: string;
  items: string[] | SidebarItem[];
}

interface SidebarData {
  [key: string]: SidebarSection;
}

const sidebarData: SidebarData = {
  dashboard: {
    title: "🏠 لوحة التحكم الرئيسية",
    items: [
      {
        name: "🏠 لوحة التحكم",
        section: "General Dashboard",
        href: "/dashboard",
      },
    ],
  },
  coursesManagement: {
    title: "📚 إدارة الدورات",
    section: "Courses Management",
    items: ["📂 جميع الدورات", "➕ إضافة دورة جديدة", "📋 حالة الدورات"],
  },
  pathsManagement: {
    title: "🛣️ إدارة المسارات التعليمية",
    section: "Learning Paths Management",
    items: ["🛣️ جميع المسارات التعليمية", "➕ إضافة مسار جديد"],
  },
  contentManagement: {
    title: "🎥 إدارة المحتوى",
    section: "Content Management",
    items: [
      "🎞️ إدارة الفيديوهات (إذا كنت ترفع الفيديوهات يدويًا أو من خارج المنصة)",
      "🗂️ إدارة الملفات والمرفقات",
    ],
  },
  analyticsReports: {
    title: "📊 التحليلات والتقارير",
    section: "Analytics & Reports",
    items: [
      "📈 إحصائيات عامة",
      "💰 تقارير المبيعات",
      "📋 تقارير الطلبات",
      "👤 تقارير المستخدمين",
    ],
  },
  userManagement: {
    title: "👥 إدارة المستخدمين",
    section: "User Management",
    items: ["👤 جميع المستخدمين", "🛡️ صلاحيات المشرفين"],
  },
  ordersPayments: {
    title: "🛒 إدارة الطلبات والمدفوعات",
    section: "Orders & Payments Management",
    items: [
      "🛒 جميع الطلبات",
      "💳 المدفوعات والمعاملات المالية",
      "🔄 سجل المرتجعات (في حال دعم سياسة الاسترجاع)",
    ],
  },
  couponsManagement: {
    title: "🎟️ إدارة الكوبونات والخصومات",
    section: "Coupons & Discounts Management",
    items: ["🎫 جميع الكوبونات", "➕ إضافة كوبون جديد"],
  },
  reviewsFeedback: {
    title: "📝 إدارة المراجعات والتعليقات",
    section: "Reviews & Feedback",
    items: ["⭐ جميع المراجعات", "💬 جميع التعليقات"],
  },
  messagesNotifications: {
    title: "📧 إدارة الرسائل والإشعارات",
    section: "Messages & Notifications",
    items: [
      "✉️ إعداد رسائل البريد الإلكتروني",
      "🔔 إعداد الإشعارات داخل المنصة",
    ],
  },
  settings: {
    title: "⚙️ الإعدادات",
    section: "Settings",
    items: [
      "🛠️ إعدادات المنصة",
      "💳 إعدادات الدفع",
      "🌍 إعدادات اللغة والمنطقة الزمنية",
      "🔒 إعدادات الحماية",
    ],
  },
  teamManagement: {
    title: "🧑‍💼 إدارة الفريق",
    section: "Team Management",
    items: ["👥 إدارة الأعضاء والمشرفين", "➕ دعوة عضو جديد"],
  },
};

// Helper function to generate route from Arabic text
const generateRoute = (text: string): string => {
  const routeMap: { [key: string]: string } = {
    "🏠 لوحة التحكم": "/dashboard",
    "📂 جميع الدورات": "/courses",
    "➕ إضافة دورة جديدة": "/courses/new",
    "📋 حالة الدورات": "/courses/status",
    "🛣️ جميع المسارات التعليمية": "/learning-paths",
    "➕ إضافة مسار جديد": "/learning-paths/new",
    "🎞️ إدارة الفيديوهات (إذا كنت ترفع الفيديوهات يدويًا أو من خارج المنصة)":
      "/content/videos",
    "🗂️ إدارة الملفات والمرفقات": "/content/files",
    "📈 إحصائيات عامة": "/analytics/overview",
    "💰 تقارير المبيعات": "/analytics/sales",
    "📋 تقارير الطلبات": "/analytics/orders",
    "👤 تقارير المستخدمين": "/analytics/users",
    "👤 جميع المستخدمين": "/users",
    "🛡️ صلاحيات المشرفين": "/users/admins",
    "🛒 جميع الطلبات": "/orders",
    "💳 المدفوعات والمعاملات المالية": "/payments",
    "🔄 سجل المرتجعات (في حال دعم سياسة الاسترجاع)": "/refunds",
    "🎫 جميع الكوبونات": "/coupons",
    "➕ إضافة كوبون جديد": "/coupons/new",
    "⭐ جميع المراجعات": "/reviews",
    "💬 جميع التعليقات": "/comments",
    "✉️ إعداد رسائل البريد الإلكتروني": "/messages/email",
    "🔔 إعداد الإشعارات داخل المنصة": "/messages/notifications",
    "🛠️ إعدادات المنصة": "/settings/platform",
    "💳 إعدادات الدفع": "/settings/payment",
    "🌍 إعدادات اللغة والمنطقة الزمنية": "/settings/locale",
    "🔒 إعدادات الحماية": "/settings/security",
    "👥 إدارة الأعضاء والمشرفين": "/team/members",
    "➕ دعوة عضو جديد": "/team/invite",
  };

  return routeMap[text] || "#";
};

function Sidebar() {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const renderSingleItemSection = (
    section: SidebarSection,
    sectionKey: string
  ) => {
    if (!Array.isArray(section.items) || section.items.length === 0)
      return null;

    const item = section.items[0];
    const itemText = typeof item === "string" ? item : item.name;
    const href =
      typeof item === "object" && item.href
        ? item.href
        : generateRoute(itemText);

    return (
      <Button
        key={sectionKey}
        variant={isActive(href) ? "default" : "ghost"}
        className={cn(
          "w-full justify-start text-right h-auto py-3 px-4",
          isActive(href) && "bg-primary text-primary-foreground"
        )}
      >
        <Link to={href}>{itemText}</Link>
      </Button>
    );
  };

  const renderMultiItemSection = (
    section: SidebarSection,
    sectionKey: string
  ) => {
    return (
      <AccordionItem
        key={sectionKey}
        value={sectionKey}
        className="border-none"
      >
        <AccordionTrigger
          shownChevronDownIcon={true}
          className="text-right py-3 px-4 hover:bg-muted rounded-md [&[data-state=open]>svg]:rotate-180"
        >
          <span className="font-medium">{section.title}</span>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <div className="space-y-1 mr-4">
            {section.items.map((item, index) => {
              const itemText = typeof item === "string" ? item : item.name;
              const href =
                typeof item === "object" && item.href
                  ? item.href
                  : generateRoute(itemText);

              return (
                <Button
                  key={index}
                  variant={isActive(href) ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start text-right h-auto py-2 px-3",
                    isActive(href) && "bg-primary text-primary-foreground"
                  )}
                >
                  <Link to={href}>{itemText}</Link>
                </Button>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Separate dashboard and other sections
  const { dashboard, ...otherSections } = sidebarData;
  const defaultAccordionValues = Object.keys(otherSections).slice(0, 2); // Open first 2 sections by default

  return (
    <aside className="w-80 bg-background border-r border-border h-screen overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold text-foreground mb-8 text-right">
          لوحة تحكم الإدارة
        </h1>

        <nav className="space-y-4">
          {/* Dashboard section - always visible */}
          <div className="space-y-2">
            {renderSingleItemSection(dashboard, "dashboard")}
          </div>

          {/* Other sections with accordion */}
          <Accordion
            type="multiple"
            defaultValue={defaultAccordionValues}
            className="space-y-2"
          >
            {Object.entries(otherSections).map(([sectionKey, section]) => {
              const hasMultipleItems =
                Array.isArray(section.items) && section.items.length > 1;

              return hasMultipleItems
                ? renderMultiItemSection(section, sectionKey)
                : renderSingleItemSection(section, sectionKey);
            })}
          </Accordion>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
