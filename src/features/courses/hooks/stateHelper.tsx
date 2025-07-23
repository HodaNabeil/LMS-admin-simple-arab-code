export interface Lesson {
    id: string;
    name: string;
    video?: File | null;
    description?: string;
  }
  
  export interface Section {
    id: string;
    name: string;
    description?: string;
    lessons: Lesson[];
  }
  export type SectionModalMode = "add" | "edit";

  export type ShowLessonModalType = null | {
    sectionId: string;
    mode: "add" | "edit";
    lessonId?: string;
  };
  
  export type DeleteLessonModalType = null | {
    sectionId: string;
    lessonId: string;
    lessonName: string;
  };
  
  export type VideoModalType = null | {
    sectionId: string;
    lessonId: string;
  };
  
  export interface CurriculumState {
    sections: Section[];
    sectionName: string;
    editingLessonId: string | null;
    lessonEditValue: string;
    showSectionModal: boolean;
    sectionDescription: string;
    sectionModalMode: SectionModalMode;
    editingSection: Section | null;
    showDeleteSectionModal: boolean;
    sectionToDelete: Section | null;
    showLessonModal: ShowLessonModalType;
    newLessonName: string;
    newLessonDescription: string;
    deleteLessonModal: DeleteLessonModalType;
    videoModal: VideoModalType;
  }

  export interface CurriculumState {
    sections: Section[];
    sectionName: string;
    editingLessonId: string | null;
    lessonEditValue: string;
    showSectionModal: boolean;
    sectionDescription: string;
    sectionModalMode: SectionModalMode;
    editingSection: Section | null;
    showDeleteSectionModal: boolean;
    sectionToDelete: Section | null;
    showLessonModal: ShowLessonModalType;
    newLessonName: string;
    newLessonDescription: string;
    deleteLessonModal: DeleteLessonModalType;
    videoModal: VideoModalType;
  }
  
  export const initialState: CurriculumState = {
    sections: [],
    sectionName: "",
    editingLessonId: null,
    lessonEditValue: "",
    showSectionModal: false,
    sectionDescription: "",
    sectionModalMode: "add",
    editingSection: null,
    showDeleteSectionModal: false,
    sectionToDelete: null,
    showLessonModal: null,
    newLessonName: "",
    newLessonDescription: "",
    deleteLessonModal: null,
    videoModal: null,
  };

  export type CurriculumAction =
    | { type: "SET_SECTIONS"; payload: Section[] }
    | { type: "SET_SECTION_NAME"; payload: string }
    | { type: "SET_EDITING_LESSON_ID"; payload: string | null }
    | { type: "SET_LESSON_EDIT_VALUE"; payload: string }
    | { type: "SET_SHOW_SECTION_MODAL"; payload: boolean }
    | { type: "SET_SECTION_DESCRIPTION"; payload: string }
    | { type: "SET_SECTION_MODAL_MODE"; payload: SectionModalMode }
    | { type: "SET_EDITING_SECTION"; payload: Section | null }
    | { type: "SET_SHOW_DELETE_SECTION_MODAL"; payload: boolean }
    | { type: "SET_SECTION_TO_DELETE"; payload: Section | null }
    | { type: "SET_SHOW_LESSON_MODAL"; payload: ShowLessonModalType }
    | { type: "SET_NEW_LESSON_NAME"; payload: string }
    | { type: "SET_NEW_LESSON_DESCRIPTION"; payload: string }
    | { type: "SET_DELETE_LESSON_MODAL"; payload: DeleteLessonModalType }
    | { type: "SET_VIDEO_MODAL"; payload: VideoModalType };
  

  
  export function reducer(state: CurriculumState, action: CurriculumAction): CurriculumState {
    switch (action.type) {
      case "SET_SECTIONS":
        return { ...state, sections: action.payload };
      case "SET_SECTION_NAME":
        return { ...state, sectionName: action.payload };
      case "SET_EDITING_LESSON_ID":
        return { ...state, editingLessonId: action.payload };
      case "SET_LESSON_EDIT_VALUE":
        return { ...state, lessonEditValue: action.payload };
      case "SET_SHOW_SECTION_MODAL":
        return { ...state, showSectionModal: action.payload };
      case "SET_SECTION_DESCRIPTION":
        return { ...state, sectionDescription: action.payload };
      case "SET_SECTION_MODAL_MODE":
        return { ...state, sectionModalMode: action.payload };
      case "SET_EDITING_SECTION":
        return { ...state, editingSection: action.payload };
      case "SET_SHOW_DELETE_SECTION_MODAL":
        return { ...state, showDeleteSectionModal: action.payload };
      case "SET_SECTION_TO_DELETE":
        return { ...state, sectionToDelete: action.payload };
      case "SET_SHOW_LESSON_MODAL":
        return { ...state, showLessonModal: action.payload };
      case "SET_NEW_LESSON_NAME":
        return { ...state, newLessonName: action.payload };
      case "SET_NEW_LESSON_DESCRIPTION":
        return { ...state, newLessonDescription: action.payload };
      case "SET_DELETE_LESSON_MODAL":
        return { ...state, deleteLessonModal: action.payload };
      case "SET_VIDEO_MODAL":
        return { ...state, videoModal: action.payload };
      default:
        return state;
    }
  }
  