import type { Review, ReviewStatus } from "@/types/reviews";

const arabicNames = [
  "أحمد محمد", "فاطمة علي", "عمر خالد", "مريم إبراهيم", "يوسف عبدالله",
  "نورة سعد", "خالد حسن", "ليلى محمود", "عبدالرحمن أحمد", "سارة عمر"
];

const arabicCourseTitles = [
  "مقدمة في البرمجة", "تطوير الويب المتقدم", "قواعد البيانات", "الذكاء الاصطناعي",
  "تصميم واجهات المستخدم", "الأمن السيبراني", "هياكل البيانات", "تطبيقات الموبايل",
  "برمجة بايثون", "تحليل البيانات"
];

const reviewComments = [
  "دورة ممتازة جداً والشرح واضح ومفصل",
  "استفدت كثيراً من هذه الدورة، شكراً للمدرب",
  "محتوى الدورة غني ومفيد للغاية",
  "أوصي بشدة بهذه الدورة لكل المبتدئين",
  "شرح رائع وممارسات عملية تطبيقية",
  "دورة تغطي جميع الجوانب المطلوبة",
  "المحتوى منظم والمدرب متفهم",
  "تجربة تعليمية رائعة ومفيدة",
  "الدورة ساعدتني في تطوير مهاراتي",
  "محتوى عالي الجودة وشرح مبسط"
];

const instructorReplies = [
  "شكراً لك على مراجعتك الرائعة، سعيد بذلك",
  "نحن سعداء بوجودك معنا، استمر في التقدم",
  "مراجعتك تهمنا كثيراً، شكراً لوقتك",
  "نتمنى لك كل التوفيق في رحلتك التعليمية",
  "جميل جداً، استمر في الممارسة والتطبيق"
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomRating(): number {
  return Math.floor(Math.random() * 3) + 3; // Ratings between 3-5
}

function getRandomStatus(): ReviewStatus {
  const statuses: ReviewStatus[] = ['approved', 'pending', 'rejected'];
  return getRandomElement(statuses);
}

function getRandomDate(daysBack: number = 30): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString();
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function generateFakeReview(overrides: Partial<Review> = {}): Review {
  const studentName = getRandomElement(arabicNames);
  const courseTitle = getRandomElement(arabicCourseTitles);
  const comment = getRandomElement(reviewComments);
  const rating = getRandomRating();
  const status = getRandomStatus();
  const createdAt = getRandomDate();
  
  const hasInstructorReply = Math.random() > 0.5;
  
  return {
    id: generateId(),
    rating,
    comment,
    status,
    createdAt,
    student: {
      id: generateId(),
      name: studentName,
      avatar: null
    },
    course: {
      id: generateId(),
      title: courseTitle
    },
    instructorReply: hasInstructorReply ? {
      message: getRandomElement(instructorReplies),
      createdAt: getRandomDate(7) // Reply within 7 days of review
    } : null,
    meta: {
      completionRate: Math.floor(Math.random() * 30) + 70, // 70-100%
      source: Math.random() > 0.5 ? 'web' : 'mobile',
      flagged: Math.random() > 0.9 // 10% chance of being flagged
    },
    ...overrides
  };
}

export function generateFakeReviews(count: number = 10, overrides?: Partial<Review>): Review[] {
  return Array.from({ length: count }, () => generateFakeReview(overrides));
}

// Pre-generated sets for quick use
export const fakeReviewsSet = {
  small: generateFakeReviews(5),
  medium: generateFakeReviews(15),
  large: generateFakeReviews(50)
};
