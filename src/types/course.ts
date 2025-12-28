export enum CourseLevel {
  ALL = "ALL",
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum CourseType {
  SINGLE = "SINGLE",
  BUNDLE = "BUNDLE",
}

export enum CourseStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

// export interface Course {
//   id: string;
//   name: string;
//   slug: string;
//   image?: File | string;
//   heading: string;
//   promoVideoUrl?: string;
//   hours: number;
//   level: CourseLevel;
//   type: CourseType;
//   isAvailableForPurchase: boolean;
//   priceInCents: number;
//   insteadOf?: number;
//   pathId: string;
//   whatYouWillLearn: {
//     data: string[];
//   };
//   whoIsThisFor: {
//     data: string[];
//   };
//   knowledgeNeeded?: string;
//   status: CourseStatus;
//   createdAt: string;
//   updatedAt: string;
// }

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'FIXED' | 'PERCENTAGE';
  createdAt: string;
  expiresAt: string;
  uses: number;
  limit: number;
  allCourses: boolean;
  isActive: boolean;
}

export interface CouponsResponse {
  activeCoupons: Coupon[];
  expiredCoupons: Coupon[];
}



export interface Course {
  id: number;
  name: string;
  slug: string;
  category: string;
  type: string;
  level: string;
  instructor: string;
  price: number;
  image: string;
  students?: number;
  rating?: number;
  hours: number;
}

export interface CourseFilters {
  searchTerm: string;
  selectedCategory: string;
  selectedLevel: string;
  selectedType: string;
  minPrice: number;
}