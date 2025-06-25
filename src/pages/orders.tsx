import CourseFilters from "@/features/orders/components/OrdersFilters";
import CourseTable from "@/features/orders/components/CourseTable";

import { useMemo, useState } from "react";

interface Course {
  id: number;
  title: string;
  category: string;
  type: string;
  level: string;
  instructor: string;
  price: number;
  image: string;
  students?: number;
  rating?: number;
}

const courses: Course[] = [
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

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedLevel, setSelectedLevel] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [minPrice, setMinPrice] = useState(0);
  const [dateOrder, setDateOrder] = useState("desc");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [selectedCurrency, setSelectedCurrency] = useState("all");
  const [selectedAmount, setSelectedAmount] = useState("all");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "الكل" || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "الكل" || course.level === selectedLevel;

      const matchesType =
        selectedType === "الكل" || course.type === selectedType;

      const matchesPrice =
        minPrice === 0 ||
        (minPrice === -1 && course.price === 0) ||
        (minPrice > 0 && course.price >= minPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesType &&
        matchesPrice
      );
    });
  }, [searchTerm, selectedCategory, selectedLevel, selectedType, minPrice]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("الكل");
    setSelectedLevel("الكل");
    setSelectedType("الكل");
    setMinPrice(0);
    setDateOrder("desc");
    setSelectedPaymentMethod("all");
    setSelectedCurrency("all");
    setSelectedAmount("all");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">كل الطلبات </h1>
        <button>
          <span className="text-blue-500 hover:underline">إضافة طلب جديد</span>
        </button>
      </div>
      <CourseFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        dateOrder={dateOrder}
        onDateOrderChange={setDateOrder}
        selectedPaymentMethod={selectedPaymentMethod}
        onPaymentMethodChange={setSelectedPaymentMethod}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
        selectedAmount={selectedAmount}
        onAmountChange={setSelectedAmount}
        onClearFilters={handleClearFilters}
      />
      <CourseTable courses={filteredCourses} />
    </div>
  );
}
