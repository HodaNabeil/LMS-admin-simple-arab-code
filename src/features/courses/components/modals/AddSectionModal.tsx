import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CurriculumAction, CurriculumState } from "@/features/courses/hooks/stateHelper";
import type { Dispatch } from "react";




export default function AddSectionModal( { state , dispatch , sectionInputRef , handleAddOrEditSection }: 
    { state : CurriculumState , dispatch : Dispatch<CurriculumAction> , sectionInputRef : React.RefObject<HTMLInputElement> , handleAddOrEditSection : () => void }) {
  return (
    <Dialog
    open={state.showSectionModal}
    onOpenChange={(open) => {
      if (!open) {
        dispatch({ type: "SET_SHOW_SECTION_MODAL", payload: false });
        dispatch({ type: "SET_EDITING_SECTION", payload: null });
      }
    }}
  >
    <DialogContent showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>
          {state.sectionModalMode === "add" ? "إضافة قسم جديد" : "تعديل القسم"}
        </DialogTitle>
      </DialogHeader>
      <input
        ref={sectionInputRef}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d4d7f7] focus:border-[#d4d7f7] transition-all duration-150 shadow-sm mt-4"
        placeholder="اسم القسم"
        value={state.sectionName}
        onChange={(e) => dispatch({ type: "SET_SECTION_NAME", payload: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddOrEditSection();
        }}
        autoFocus
      />
      <Label htmlFor="sectionDescription">وصف القسم</Label>
      <Textarea
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d4d7f7] focus:border-[#d4d7f7] transition-all duration-150 shadow-sm mt-4"
        placeholder="وصف القسم"
        value={state.sectionDescription}
        onChange={(e) => dispatch({ type: "SET_SECTION_DESCRIPTION", payload: e.target.value })}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              dispatch({ type: "SET_SHOW_SECTION_MODAL", payload: false });
              dispatch({ type: "SET_EDITING_SECTION", payload: null });
            }}
          >
            إلغاء
          </Button>
        </DialogClose>
        <Button
          type="button"
          onClick={handleAddOrEditSection}
          disabled={!state.sectionName.trim()}
        >
          {state.sectionModalMode === "add" ? "إضافة" : "تعديل"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}
