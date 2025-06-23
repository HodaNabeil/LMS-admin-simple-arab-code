import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Settings,
  Bell,
  CreditCard,
  ShieldCheck,
  FileText,
  BookOpen,
  Users,
  FolderOpen,
  Briefcase,
  Megaphone,
  Wallet,
  User,
  BarChart3,
  Bot,
  ChevronLeft,
  PlusCircle,
  FileStack,
  FileCheck2,
  FileCog,
  FileLock2,
  FileText as FileTextIcon,
  MessageCircle,
  Star,
  Mail,
  Globe,
  Lock,
  UserPlus,
  UserCog,
  Tag,
  Layers,
  PieChart,
  File,
  FilePlus,
  Users2,
  FileSearch,
  FileBarChart2,
  FileBadge2,
  FileSignature,
  FileCheck,
  FileClock,
  FileWarning,
  FileOutput,
  FileInput,
  FileMinus,
  FileEdit,
  FileX,
  FileUp,
  FileDown,
  FileArchive,
  FileAudio,
  FileVideo,
  FileImage,
  FileSpreadsheet,
  FileSymlink,
  FileTerminal,
  FileType,
  FileVolume,
  FileJson,
  FileCode2,
  FileDiff,
  FileQuestion,
  FileKey,
  FileHeart,
  Download
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useState } from "react";

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

// بيانات السايدبار من json
const sidebarData = [

  {
    title: "التحكم بالنظام",
    icon: <Settings className="w-5 h-5" />,
    items: [
      { name: "بث التنبيهات", icon: <Bell className="w-4 h-4" />, path: "/notifications" },
      { name: "باقات الاشتراك", icon: <CreditCard className="w-4 h-4" />, path: "/plans" },
      { name: "سياسة الخصوصية", icon: <ShieldCheck className="w-4 h-4" />, path: "/privacy" },
      { name: "الشروط والأحكام", icon: <FileText className="w-4 h-4" />, path: "/terms" },
      { name: "باني الصفحات", icon: <FileStack className="w-4 h-4" />, path: "/page-builder" },
      { name: "باني المحتوى", icon: <FileTextIcon className="w-4 h-4" />, path: "/content-builder" },
      { name: "بوت الذكاء الاصطناعي", icon: <Bot className="w-4 h-4" />, path: "/ai-bot" }
    ]
  },
  {
    title: "قاعدة المستخدمين",
    icon: <Users className="w-5 h-5" />,
    items: [
      { name: "جميع المستخدمين", icon: <Users className="w-4 h-4" />, path: "/users" }
    ]
  },
  {
    title: "إدارة المحتوى",
    icon: <FolderOpen className="w-5 h-5" />,
    items: [
      { name: "إدارة الفيديوهات", icon: <FileVideo className="w-4 h-4" />, path: "/videos" },
      { name: "إدارة الملفات والمرفقات", icon: <FileTextIcon className="w-4 h-4" />, path: "/files" }
    ]
  },
  {
    title: "حقيبة الطلاب",
    icon: <Briefcase className="w-5 h-5" />,
    items: [
      { name: "حقيبة الطلاب", icon: <Briefcase className="w-4 h-4" />, path: "/students-bag" }
    ]
  },
  {
    title: "التسويق",
    icon: <Megaphone className="w-5 h-5" />,
    items: [
      { name: "التسويق", icon: <Megaphone className="w-4 h-4" />, path: "/marketing" }
    ]
  },
  {
    title: "المحفظة",
    icon: <Wallet className="w-5 h-5" />,
    items: [
      { name: "المحفظة", icon: <Wallet className="w-4 h-4" />, path: "/wallet" }
    ]
  },
  {
    title: "الملف الشخصي",
    icon: <User className="w-5 h-5" />,
    items: [
      { name: "الملف الشخصي", icon: <User className="w-4 h-4" />, path: "/profile" }
    ]
  },
  {
    title: "التقارير والإحصائيات",
    icon: <BarChart3 className="w-5 h-5" />,
    items: [
      { name: "التقارير والإحصائيات", icon: <BarChart3 className="w-4 h-4" />, path: "/reports" }
    ]
  }
];

function Sidebar({ isCollapsed = false }: SidebarProps = {}) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <aside className="w-64 h-screen overflow-y-auto cairo-font bg-white border-r border-gray-100 shadow-xl flex flex-col">
      {/* User Profile */}
      <div className="flex items-center gap-3 h-20 px-6 border-b border-gray-100 mb-2">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="محمد محمد" className="w-10 h-10 rounded-full object-cover" />
        <span className="font-bold text-base text-gray-800 cairo-font">محمد محمد</span>
      </div>
      <div className="flex-1 p-2">
        <Accordion type="single" collapsible className="space-y-1 bg-white">
          {sidebarData.map((section, index) => (
            <AccordionItem key={index} value={index.toString()} className="border-none">
              <AccordionTrigger
                className={`flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg text-base font-semibold transition-all ${activeSection === index.toString() ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setActiveSection(activeSection === index.toString() ? null : index.toString())}
              >
                <span className={`flex items-center gap-2 ${activeSection === index.toString() ? 'text-white' : 'text-gray-500'}`}>{section.icon}</span>
                <span>{section.title}</span>
                <ChevronLeft className={`ml-auto transition-transform ${activeSection === index.toString() ? 'rotate-180 text-white' : 'text-gray-400'}`} />
              </AccordionTrigger>
              {section.items.length > 0 && (
                <AccordionContent className="bg-transparent px-0">
                  <ul className="pl-6 space-y-2 mt-2">
                    {section.items.map((item, i) => {
                      const itemName = typeof item === 'string' ? item : item.name;
                      const isActive = activeSection === index.toString() && activeItem === itemName;
                      return (
                        <li
                          key={i}
                          className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition-all ${isActive ? 'bg-[#2563eb] text-white shadow-sm' : 'text-gray-500 hover:text-[#2563eb] hover:bg-[#e0edff]'}`}
                          onClick={() => {
                            setActiveItem(itemName);
                            if (item.path) navigate(item.path);
                          }}
                        >
                          {typeof item === 'object' && item.icon && (
                            <span className="text-gray-400">{item.icon}</span>
                          )}
                          <span>{itemName}</span>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  );
}

export default Sidebar;
