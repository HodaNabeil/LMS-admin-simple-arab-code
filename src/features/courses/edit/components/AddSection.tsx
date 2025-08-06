import { Button } from "@/components/ui/button";
import type { CurriculumAction } from "@/features/courses/hooks/stateHelper";
import { Plus } from "lucide-react";
import type { Dispatch } from "react";
export default function AddSection({
  dispatch,
}: {
  dispatch: Dispatch<CurriculumAction>;
}) {
  return (
    <Button
      type="button"
      variant="link"
      className="text-[#1a237e] flex items-center gap-1 p-0 h-auto"
      onClick={() => {
        dispatch({ type: "SET_SECTION_MODAL_MODE", payload: "add" });
        dispatch({ type: "SET_SECTION_NAME", payload: "" });
        dispatch({ type: "SET_SECTION_DESCRIPTION", payload: "" });
        dispatch({ type: "SET_EDITING_SECTION", payload: null });
        dispatch({ type: "SET_SHOW_SECTION_MODAL", payload: true });
      }}
    >
      إضافة قسم <Plus className="w-4 h-4 ml-1" />
    </Button>
  );
}
