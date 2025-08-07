import { Button } from "@/components/ui/button";
import type {
  CurriculumAction,
  CurriculumState,
  Lesson,
  Section,
} from "@/features/courses/hooks/stateHelper";
import { CheckCircle, FileText, Pencil, Plus, Trash2 } from "lucide-react";
import type { Dispatch } from "react";

// Types for better type safety
interface SectionHeaderProps {
  section: Section;
  sectionIndex: number;
  onEdit: (section: Section) => void;
  onDelete: (section: Section) => void;
}

interface LessonItemProps {
  lesson: Lesson;
  lessonIndex: number;
  sectionId: string;
  isEditing: boolean;
  editValue: string;
  dispatch: Dispatch<CurriculumAction>;
  onSaveEdit: (sectionId: string, lessonId: string) => void;
}

interface AddLessonButtonProps {
  sectionId: string;
  dispatch: Dispatch<CurriculumAction>;
}

// Extracted SectionHeader component
function SectionHeader({
  section,
  sectionIndex,
  onEdit,
  onDelete,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="font-bold text-lg text-[#1a237e]">
        القسم {sectionIndex + 1} :
      </span>
      <FileText className="w-5 h-5 text-[#1a237e]/80" />
      <span className="text-base text-gray-900">{section.name}</span>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => onEdit(section)}
        className="text-gray-700"
        title="تعديل القسم"
      >
        <Pencil className="w-4 h-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => onDelete(section)}
        className="text-red-400 hover:text-red-600"
        title="حذف القسم"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

// Extracted LessonItem component
function LessonItem({
  lesson,
  lessonIndex,
  sectionId,
  isEditing,
  editValue,
  dispatch,
  onSaveEdit,
}: LessonItemProps) {
  const handleEditClick = () => {
    dispatch({
      type: "SET_SHOW_LESSON_MODAL",
      payload: {
        sectionId,
        mode: "edit",
        lessonId: lesson.id,
      },
    });
    dispatch({ type: "SET_NEW_LESSON_NAME", payload: lesson.name });
    dispatch({
      type: "SET_NEW_LESSON_DESCRIPTION",
      payload: lesson.description || "",
    });
  };

  const handleDeleteClick = () => {
    dispatch({
      type: "SET_DELETE_LESSON_MODAL",
      payload: {
        sectionId,
        lessonId: lesson.id,
        lessonName: lesson.name,
      },
    });
  };

  const handleAddContentClick = () => {
    dispatch({
      type: "SET_VIDEO_MODAL",
      payload: { sectionId, lessonId: lesson.id },
    });
  };

  const handleInputChange = (value: string) => {
    dispatch({ type: "SET_LESSON_EDIT_VALUE", payload: value });
  };

  const handleInputSubmit = () => {
    onSaveEdit(sectionId, lesson.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  return (
    <div className="bg-[#fbfbfb] rounded-lg p-4 flex flex-col gap-2 border border-gray-100">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="font-bold text-[#1a237e]">
          الدرس {lessonIndex + 1}:
        </span>
        <FileText className="w-4 h-4 text-[#1a237e]/80" />

        {isEditing ? (
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 text-base
             bg-white text-gray-900 focus:outline-none focus:ring-1 
             focus:ring-[#d4d7f7] focus:border-[#d4d7f7]
             transition-all duration-150 shadow-sm"
            value={editValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleInputSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className="text-base text-gray-900">{lesson.name}</span>
        )}

        <Button
          size="sm"
          variant="ghost"
          onClick={handleEditClick}
          className="text-gray-700"
          title="تعديل الدرس"
        >
          <Pencil className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={handleDeleteClick}
          className="text-red-400 hover:text-red-600"
          title="حذف الدرس"
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        <div className="flex-1" />

        <Button
          size="sm"
          variant="outline"
          className="bg-[#f7f7f9] border-gray-300 text-[#1a237e] px-4"
          onClick={handleAddContentClick}
        >
          <Plus className="w-4 h-4 ml-1" /> محتوى
        </Button>
      </div>
    </div>
  );
}

// Extracted AddLessonButton component
function AddLessonButton({ sectionId, dispatch }: AddLessonButtonProps) {
  const handleAddLesson = () => {
    dispatch({
      type: "SET_SHOW_LESSON_MODAL",
      payload: { sectionId, mode: "add" },
    });
    dispatch({ type: "SET_NEW_LESSON_NAME", payload: "" });
    dispatch({ type: "SET_NEW_LESSON_DESCRIPTION", payload: "" });
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        size="sm"
        onClick={handleAddLesson}
        variant="secondary"
        className="bg-white text-[#1a237e] border border-gray-300 hover:bg-gray-100"
      >
        <Plus className="w-4 h-4 ml-1" /> إضافة درس
      </Button>
    </div>
  );
}

// Main component interface
interface CreateSectionProps {
  section: Section;
  idx: number;
  dispatch: Dispatch<CurriculumAction>;
  state: CurriculumState;
}

// Main refactored component
export default function CreateSection({
  section,
  idx,
  dispatch,
  state,
}: CreateSectionProps) {
  // Extracted handler functions
  const handleStartEditSection = (section: Section) => {
    dispatch({ type: "SET_SECTION_MODAL_MODE", payload: "edit" });
    dispatch({ type: "SET_EDITING_SECTION", payload: section });
    dispatch({ type: "SET_SECTION_NAME", payload: section.name });
    dispatch({
      type: "SET_SECTION_DESCRIPTION",
      payload: section.description || "",
    });
    dispatch({ type: "SET_SHOW_SECTION_MODAL", payload: true });
  };

  const handleDeleteSection = (section: Section) => {
    dispatch({ type: "SET_SECTION_TO_DELETE", payload: section });
    dispatch({ type: "SET_SHOW_DELETE_SECTION_MODAL", payload: true });
  };

  const handleSaveEditLesson = (sectionId: string, lessonId: string) => {
    dispatch({
      type: "SET_SECTIONS",
      payload: state.sections.map((s: Section) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l: Lesson) =>
                l.id === lessonId ? { ...l, name: state.lessonEditValue } : l
              ),
            }
          : s
      ),
    });
    dispatch({ type: "SET_EDITING_LESSON_ID", payload: null });
    dispatch({ type: "SET_LESSON_EDIT_VALUE", payload: "" });
  };

  return (
    <div className="bg-[#ffffff] rounded-xl p-6 shadow space-y-4 border border-gray-200">
      <SectionHeader
        section={section}
        sectionIndex={idx}
        onEdit={handleStartEditSection}
        onDelete={handleDeleteSection}
      />

      {/* Lessons container */}
      <div className="space-y-4 mr-8">
        {section.lessons.map((lesson, lessonIndex) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            lessonIndex={lessonIndex}
            sectionId={section.id}
            isEditing={state.editingLessonId === lesson.id}
            editValue={state.lessonEditValue}
            dispatch={dispatch}
            onSaveEdit={handleSaveEditLesson}
          />
        ))}

        <AddLessonButton sectionId={section.id} dispatch={dispatch} />
      </div>
    </div>
  );
}
