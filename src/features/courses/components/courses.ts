import type { Course, CourseFilters } from "@/types/course";

export const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title:
      "دورة تطوير تطبيقات باستخدام Flutter - بناء واجهات احترافية لأنظمة iOS و Android",
    category: "تطوير التطبيقات",
    type: "تفاعلية",
    level: "متوسط",
    instructor: "أحمد محمد",
    price: 299,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 145,
    rating: 4.8,
  },
  {
    id: 2,
    title:
      "دورة تطوير مواقع الويب باستخدام React و Next.js - من المبتدئ إلى المحترف",
    category: "تطوير الويب",
    type: "تقنية",
    level: "متقدم",
    instructor: "سارة أحمد",
    price: 450,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 298,
    rating: 4.9,
  },
  {
    id: 3,
    title: "دورة تصميم واجهات المستخدم UX/UI - إنشاء تجارب مستخدم مميزة",
    category: "تصميم",
    type: "إبداعية",
    level: "مبتدئ",
    instructor: "محمد علي",
    price: 199,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 89,
    rating: 4.7,
  },
];

export const DEFAULT_FILTERS: CourseFilters = {
  searchTerm: "",
  selectedCategory: "الكل",
  selectedLevel: "الكل",
  selectedType: "الكل",
  minPrice: 0,
};
