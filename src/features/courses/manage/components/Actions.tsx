import { Button } from "@/components/ui/button";

function Actions() {
  return (
    <div className="flex items-center gap-2">
      <Button type="button">حفظ</Button>
      <Button type="button" variant="destructive">
        حذف
      </Button>
    </div>
  );
}

export default Actions;
