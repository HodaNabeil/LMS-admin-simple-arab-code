export type AdminStats = {
  summary: {
    students: {
      count: number;
      increaseLastMonth: number;
    };
    courseEnrollments: {
      count: number;
      increaseLastMonth: number;
    };
    revenue: {
      total: number;
      increaseLastMonth: number;
    };
  };
  yearlyProgress: {
    revenueChangePercentage: number;
    monthlyRevenue: number[]; // 12 items (Jan–Dec)
  };
  averageCourseProgress: {
    inProgress: {
      count: number;
      percentage: number;
    };
    completed: {
      count: number;
      percentage: number;
    };
    enrolled: {
      count: number;
      percentage: number;
    };
  };
  recentlyCreatedCourses: Array<{
    id: string;
    name: string;
    slug: string;
    image: string | null;
    heading: string;
    promoVideoUrl: string | null;
    hours: number;
    order: number | null;
    level: "ALL" | "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; // you can expand if needed
    type: "SINGLE" | "BUNDLE"; // assumed from “SINGLE” in data
    isAvailableForPurchase: boolean;
    createdAt: string; // ISO date
    updatedAt: string; // ISO date
    priceInCents: number;
    insteadOf: number;
    whatYouWillLearn: string; // JSON stringified content
    whoIsThisFor: string; // JSON stringified content
    status: "PUBLISHED" | "DRAFT" | "ARCHIVED"; // assumed
    knowledgeNeeded: string;
  }>;
};


