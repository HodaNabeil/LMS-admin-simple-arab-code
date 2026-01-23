import { CourseDtoLevel } from "@/types/api.generated";
import type { CourseLevel } from "@/types/course";
import { create } from "zustand";

export type OptionType = { value: string; label: string };

export type CourseGoalsState = {
  whatYouWillLearn: string[];
  whoIsThisFor: string[];
  prerequisites: string[];
  selectedCourses: OptionType[];
  audienceTags: string[];
  requirements: string[];
  courseStatus: OptionType | null;
  isAvailableForPurchase: boolean;
  // Basics
  title: string;
  description: string;
  slug: string;
  level: CourseLevel;
  duration: number;
  // Media
  thumbnail: File | null;
  previewVideo: File | null;
};

interface CourseManageStore extends CourseGoalsState {
  // Actions
  setWhatYouWillLearn: (items: string[]) => void;
  setWhoIsThisFor: (items: string[]) => void;
  setPrerequisites: (items: string[]) => void;
  setSelectedCourses: (courses: OptionType[]) => void;
  setAudienceTags: (tags: string[]) => void;
  setRequirements: (text: string[]) => void;
  setCourseStatus: (status: OptionType | null) => void;
  setIsAvailableForPurchase: (isAvailable: boolean) => void;
  // Basics Actions
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setSlug: (slug: string) => void;
  setLevel: (level: CourseLevel) => void;
  setDuration: (duration: number) => void;
  // Media Actions
  setThumbnail: (file: File | null) => void;
  setPreviewVideo: (file: File | null) => void;

  // Generic update if preferred
  updateGoalsState: (updates: Partial<CourseGoalsState>) => void;
  reset: () => void;
}

const initialState: CourseGoalsState = {
  whatYouWillLearn: [],
  whoIsThisFor: [],
  prerequisites: [],
  selectedCourses: [],
  audienceTags: [],
  requirements: [],
  courseStatus: { value: "draft", label: "مسودة" },
  isAvailableForPurchase: false,
  title: "",
  description: "",
  slug: "",
  level: CourseDtoLevel.ALL_LEVELS,
  duration: 0,
  thumbnail: null,
  previewVideo: null,
};

export const useCourseManageStore = create<CourseManageStore>((set) => ({
  ...initialState,

  setWhatYouWillLearn: (whatYouWillLearn) => set({ whatYouWillLearn }),
  setWhoIsThisFor: (whoIsThisFor) => set({ whoIsThisFor }),
  setPrerequisites: (prerequisites) => set({ prerequisites }),
  setSelectedCourses: (selectedCourses) => set({ selectedCourses }),
  setAudienceTags: (audienceTags) => set({ audienceTags }),
  setRequirements: (requirements) => set({ requirements }),
  setCourseStatus: (courseStatus) => set({ courseStatus }),
  setIsAvailableForPurchase: (isAvailableForPurchase) =>
    set({ isAvailableForPurchase }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setSlug: (slug) => set({ slug }),
  setLevel: (level) => set({ level }),
  setDuration: (duration) => set({ duration }),
  setThumbnail: (thumbnail) => set({ thumbnail }),
  setPreviewVideo: (previewVideo) => set({ previewVideo }),

  updateGoalsState: (updates) => set((state) => ({ ...state, ...updates })),
  reset: () => set(initialState),
}));
