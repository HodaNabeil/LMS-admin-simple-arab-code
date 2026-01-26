import { Button } from "@/components/ui/button";
import { useCourseManageSave } from "../hooks/useCourseManageSave";
import { useCurrentManageSection } from "../hooks/useCurrentManageSection";

export default function ButtonSave() {
    const currentSection = useCurrentManageSection();
    const { handleSave, isPending } = useCourseManageSave(currentSection);

    return (
        <Button type="button" onClick={handleSave} disabled={isPending}>
            {isPending ? "جاري الحفظ..." : "حفظ"}
        </Button>
    );
}
