import { CourseDtoLevel } from "@/types/api.generated";
import type { CourseLevel } from "@/types/course";
import { create } from "zustand";

export type OptionType = { value: string; label: string };

export type CourseGoalsState = {
  // Goals
  learningObjectives: string[];
  requirements: string[];
  targetAudience: string[];
  prerequisiteCourseIds: string[];

  // Availability
  courseStatus: OptionType | null;
  isAvailableForPurchase: boolean;
  // Basics
  title: string;
  description: string;
  slug: string;
  level: CourseLevel;
  hours: number;
  shortDescription: string;

  // Media
  thumbnail: File | null;
  previewVideo: File | null;
  // Pricing
  price: number;
  compareAtPrice?: number;
};

interface CourseManageStore extends CourseGoalsState {
  // Actions
  setLearningObjectives: (items: string[]) => void;
  setRequirements: (items: string[]) => void;
  setTargetAudience: (items: string[]) => void;
  setPrerequisiteCourseIds: (courses: string[]) => void;

  setCourseStatus: (status: OptionType | null) => void;
  setIsAvailableForPurchase: (isAvailable: boolean) => void;
  // Basics Actions
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setSlug: (slug: string) => void;
  setLevel: (level: CourseLevel) => void;
  setHours: (hours: number) => void;
  setShortDescription: (shortDescription: string) => void;
  // Media Actions
  setThumbnail: (file: File | null) => void;
  setPreviewVideo: (file: File | null) => void;
  // Pricing Actions
  setPrice: (price: number) => void;
  setCompareAtPrice: (compareAtPrice?: number) => void;

  // Generic update if preferred
  updateGoalsState: (updates: Partial<CourseGoalsState>) => void;
  reset: () => void;
}

const initialState: CourseGoalsState = {
  // Goals
  learningObjectives: [],
  requirements: [],
  targetAudience: [],
  prerequisiteCourseIds: [],

  // Availability
  courseStatus: { value: "draft", label: "مسودة" },
  isAvailableForPurchase: false,
  // Basics
  title: "",
  description: "",
  slug: "",
  level: CourseDtoLevel.ALL_LEVELS,
  hours: 0,
  shortDescription: "",
  // Media
  thumbnail: null,
  previewVideo: null,
  // Pricing
  price: 0,
  compareAtPrice: undefined,
};

export const useCourseManageStore = create<CourseManageStore>((set) => ({
  ...initialState,

  setLearningObjectives: (learningObjectives) => set({ learningObjectives }),
  setRequirements: (requirements) => set({ requirements }),
  setTargetAudience: (targetAudience) => set({ targetAudience }),
  setPrerequisiteCourseIds: (prerequisiteCourseIds) => set({ prerequisiteCourseIds }),

  setCourseStatus: (courseStatus) => set({ courseStatus }),
  setIsAvailableForPurchase: (isAvailableForPurchase) =>
    set({ isAvailableForPurchase }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setSlug: (slug) => set({ slug }),
  setLevel: (level) => set({ level }),
  setHours: (hours) => set({ hours }),
  setShortDescription: (shortDescription) => set({ shortDescription }),
  setThumbnail: (thumbnail) => set({ thumbnail }),
  setPreviewVideo: (previewVideo) => set({ previewVideo }),
  setPrice: (price) => set({ price }),
  setCompareAtPrice: (compareAtPrice) => set({ compareAtPrice }),

  updateGoalsState: (updates) => set((state) => ({ ...state, ...updates })),
  reset: () => set(initialState),
}));
