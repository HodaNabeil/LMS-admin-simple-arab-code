import { useReducer, useRef } from "react";

import {
  initialState,
  reducer,
  type Lesson,
  type Section,
} from "@/features/courses/hooks/stateHelper";
import CreateSection from "./CreateSection";
import AddSectionModal from "../../modals/AddSectionModal";
import DeleteSectionModal from "../../modals/DeleteSectionModal";
import CreateLesson from "./CreateLesson";
import UploadVideoModal from "../../modals/UploadVideoModal";
import AddSection from "./AddSection";

function randomId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function Curriculum() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const sectionInputRef = useRef<HTMLInputElement | null>(null);

  // إضافة قسم جديد أو تعديل قسم
  const handleAddOrEditSection = () => {
    if (!state.sectionName.trim()) return;
    if (state.sectionModalMode === "add") {
      dispatch({
        type: "SET_SECTIONS",
        payload: [
          ...state.sections,
          {
            id: randomId(),
            name: state.sectionName,
            description: state.sectionDescription,
            lessons: [],
          },
        ],
      });
    } else if (state.sectionModalMode === "edit" && state.editingSection) {
      dispatch({
        type: "SET_SECTIONS",
        payload: state.sections.map((s: Section) =>
          s.id === state.editingSection!.id
            ? {
                ...s,
                name: state.sectionName,
                description: state.sectionDescription,
              }
            : s
        ),
      });
    }
    dispatch({ type: "SET_SECTION_NAME", payload: "" });
    dispatch({ type: "SET_SECTION_DESCRIPTION", payload: "" });
    dispatch({ type: "SET_EDITING_SECTION", payload: null });
    dispatch({ type: "SET_SHOW_SECTION_MODAL", payload: false });
  };

  // حذف قسم
  const handleDeleteSection = (sectionId: string) => {
    dispatch({
      type: "SET_SECTIONS",
      payload: state.sections.filter((s: Section) => s.id !== sectionId),
    });
    dispatch({ type: "SET_SHOW_DELETE_SECTION_MODAL", payload: false });
    dispatch({ type: "SET_SECTION_TO_DELETE", payload: null });
  };

  // رفع فيديو للدرس
  const handleUploadVideo = (
    sectionId: string,
    lessonId: string,
    file: File | null
  ) => {
    dispatch({
      type: "SET_SECTIONS",
      payload: state.sections.map((s: Section) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l: Lesson) =>
                l.id === lessonId ? { ...l, video: file } : l
              ),
            }
          : s
      ),
    });
  };

  return (
    <div className=" flex flex-col items-center  h-[calc(100vh-200px)] bg-gray-50 p-8 ">
      <h2 className="text-xl font-bold mb-8 text-[#3c45aa] self-start text-right">
        مقرر الدورة
      </h2>
      <div className="space-y-8 w-full ">
        {state.sections.map((section, idx) => (
          <CreateSection
            key={section.id}
            section={section}
            idx={idx}
            dispatch={dispatch}
            state={state}
          />
        ))}
      </div>
      {/* إضافة قسم */}
      <div className="flex items-center gap-2 mt-8 self-start ">
        <AddSection dispatch={dispatch} />
      </div>

      {/* مودال إضافة قسم */}
      <AddSectionModal
        state={state}
        dispatch={dispatch}
        sectionInputRef={sectionInputRef}
        randomId={randomId}
      />
      {/* مودال تأكيد حذف القسم */}

      <DeleteSectionModal
        state={state}
        dispatch={dispatch}
        handleDeleteSection={handleDeleteSection}
      />
      <CreateLesson state={state} dispatch={dispatch} randomId={randomId} />

      {/* مودال رفع الفيديو */}
      <UploadVideoModal
        state={state}
        dispatch={dispatch}
        handleUploadVideo={handleUploadVideo}
      />
    </div>
  );
}
