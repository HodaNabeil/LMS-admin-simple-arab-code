import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { CurriculumState } from "@/features/courses/hooks/stateHelper";
import type { Dispatch } from "react";
import type { CurriculumAction } from "@/features/courses/hooks/stateHelper";
import { VideoUploadModalContent } from "../Edit/components/VideoUploadModalContent";
export default function UploadVideo( { state , dispatch , handleUploadVideo }: 
    { state : CurriculumState , dispatch : Dispatch<CurriculumAction> , handleUploadVideo : (sectionId : string, lessonId : string, file : File | null) => void }) {
  return (
    <Dialog
    open={!!state.videoModal}
    onOpenChange={(open) => {
      if (!open) dispatch({ type: "SET_VIDEO_MODAL", payload: null });
    }}
  >
    <DialogContent showCloseButton={true}>
      <DialogHeader>
        <DialogTitle>رفع فيديو الدرس</DialogTitle>
      </DialogHeader>
      {state.videoModal !== null
        ? (() => {
            const section = state.sections.find(
              (s) => s.id === state.videoModal!.sectionId
            );
            const lesson = section?.lessons.find(
              (l) => l.id === state.videoModal!.lessonId
            );
            return (
              <VideoUploadModalContent
                lessonVideo={lesson?.video || null}
                onSave={(file) => {
                  handleUploadVideo(
                    state.videoModal!.sectionId,
                    state.videoModal!.lessonId,
                    file
                  );
                  dispatch({ type: "SET_VIDEO_MODAL", payload: null });
                }}
                onCancel={() => dispatch({ type: "SET_VIDEO_MODAL", payload: null })}
              />
            );
          })()
        : null}
    </DialogContent>
  </Dialog>
  )
}
