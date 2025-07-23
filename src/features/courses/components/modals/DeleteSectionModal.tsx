import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog";
import type { CurriculumAction, CurriculumState } from "@/features/courses/hooks/stateHelper";
import type { Dispatch } from "react";

export default function DeleteSectionModal( { state , dispatch , handleDeleteSection }: 
    { state : CurriculumState , dispatch : Dispatch<CurriculumAction> , handleDeleteSection : (sectionId : string) => void }) {
  return (
    <Dialog
    open={state.showDeleteSectionModal}
    onOpenChange={(open) => {
      if (!open) {
        dispatch({ type: "SET_SHOW_DELETE_SECTION_MODAL", payload: false });
        dispatch({ type: "SET_SECTION_TO_DELETE", payload: null });
      }
    }}
  >
    <DialogContent showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>تأكيد حذف القسم</DialogTitle>
      </DialogHeader>
      <div className="my-4 text-right text-gray-800">
        هل أنت متأكد أنك تريد حذف القسم {state.sectionToDelete?.name}؟ لا يمكن
        التراجع عن هذا الإجراء.
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              dispatch({ type: "SET_SHOW_DELETE_SECTION_MODAL", payload: false });
              dispatch({ type: "SET_SECTION_TO_DELETE", payload: null });
            }}
          >
            إلغاء
          </Button>
        </DialogClose>
        <Button
          type="button"
          variant="destructive"
          className="bg-red-500 hover:bg-red-600"
          onClick={() =>
            state.sectionToDelete && handleDeleteSection(state.sectionToDelete.id)
          }
        >
          حذف
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}
