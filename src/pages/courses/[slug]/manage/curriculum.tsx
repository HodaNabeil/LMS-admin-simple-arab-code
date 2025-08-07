import { useReducer, useRef, type RefObject } from "react";

import { initialState, reducer } from "@/features/courses/hooks/stateHelper";

import AddSectionModal from "@/features/courses/edit/components/AddSectionModal";

import CreateSection from "@/features/courses/edit/components/CreateSection";
import AddSection from "@/features/courses/edit/components/AddSection";
import DeleteSectionModal from "@/features/courses/edit/components/DeleteSectionModal";
import CreateLessonModal from "@/features/courses/edit/components/CreateLessonModal";
import DeleteLessonModal from "@/features/courses/edit/components/DeleteLessonModal";
import UploadVideoModal from "@/features/courses/edit/components/UploadVideoModal";

function randomId() {
  return Math.random().toString(36).substring(2, 9);
}
export default function Curriculum() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const sectionInputRef = useRef<HTMLInputElement | null>(null);

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
      <div className="flex items-center gap-2 mt-8 self-start ">
        <AddSection dispatch={dispatch} />
      </div>

      <AddSectionModal
        state={state}
        dispatch={dispatch}
        sectionInputRef={sectionInputRef as RefObject<HTMLInputElement>}
        randomId={randomId}
      />
      <DeleteSectionModal state={state} dispatch={dispatch} />

      <CreateLessonModal
        state={state}
        dispatch={dispatch}
        randomId={randomId}
      />
      <DeleteLessonModal state={state} dispatch={dispatch} />
      <UploadVideoModal state={state} dispatch={dispatch} />
    </div>
  );
}
