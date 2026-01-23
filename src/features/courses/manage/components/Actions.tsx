import { Button } from "@/components/ui/button";
import ButtonSave from "./button-save";

function Actions() {
  return (
    <div className="flex items-center gap-2">
      <ButtonSave />
      <Button type="button" variant="destructive">
        حذف
      </Button>
    </div>
  );
}

export default Actions;
