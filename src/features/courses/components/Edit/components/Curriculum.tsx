import { useReducer, useRef } from "react";

import {
  initialState,
  reducer,
  type Lesson,
  type Section,
} from "@/features/courses/hooks/stateHelper";
import CreateSection from "./CreateSection";
import AddSection from "./AddSection";
import DeleteSectionModal from "@/features/courses/modals/DeleteSectionModal";
import CreateLessonModal from "@/features/courses/modals/CreateLessonModal";
import DeleteLessonModal from "@/features/courses/modals/DeleteLessonModal";
import UploadVideoModal from "@/features/courses/modals/UploadVideoModal";
import AddSectionModal from "@/features/courses/modals/AddSectionModal";











function randomId() {
  return Math.random().toString(36).substring(2, 9);
}
export default function Curriculum() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const sectionInputRef = useRef<HTMLInputElement | null>(null);

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
        <AddSection dispatch={dispatch}  />
      </div>

      {/* مودال إضافة قسم */}
      <AddSectionModal
        state={state}
        dispatch={dispatch}
        sectionInputRef={sectionInputRef}
        randomId={randomId}
      />
      {/* مودال تأكيد حذف القسم */}
      <DeleteSectionModal state={state} dispatch={dispatch}  />
    
      {/* مودال تأكيد حذف الدرس */}
      <CreateLessonModal state={state} dispatch={dispatch} randomId={randomId} />


      <DeleteLessonModal state={state} dispatch={dispatch} />


      {/* مودال رفع الفيديو */}
      <UploadVideoModal
        state={state}
        dispatch={dispatch}
        handleUploadVideo={handleUploadVideo}
      />
    </div>
  );
}
