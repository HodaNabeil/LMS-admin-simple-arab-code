import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type {
  CurriculumAction,
  CurriculumState,
  Lesson,
  Section,
} from "@/features/courses/hooks/stateHelper";
import type { Dispatch } from "react";

export default function DeleteLessonModal({
  state,
  dispatch,
}: {
  state: CurriculumState;
  dispatch: Dispatch<CurriculumAction>;
}) {
  // حذف درس
  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    dispatch({
      type: "SET_SECTIONS",
      payload: state.sections.map((s: Section) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.filter((l: Lesson) => l.id !== lessonId),
            }
          : s
      ),
    });
  };
  return (
    <Dialog
      open={!!state.deleteLessonModal}
      onOpenChange={(open) => {
        if (!open) dispatch({ type: "SET_DELETE_LESSON_MODAL", payload: null });
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>تأكيد حذف الدرس</DialogTitle>
        </DialogHeader>
        <div className="my-4 text-right text-gray-800">
          هل أنت متأكد أنك تريد حذف الدرس {state.deleteLessonModal?.lessonName}؟
          لا يمكن التراجع عن هذا الإجراء.
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                dispatch({ type: "SET_DELETE_LESSON_MODAL", payload: null })
              }
            >
              إلغاء
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            className="bg-red-500 hover:bg-red-600"
            onClick={() => {
              if (state.deleteLessonModal) {
                handleDeleteLesson(
                  state.deleteLessonModal.sectionId,
                  state.deleteLessonModal.lessonId
                );
                dispatch({ type: "SET_DELETE_LESSON_MODAL", payload: null });
              }
            }}
          >
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
