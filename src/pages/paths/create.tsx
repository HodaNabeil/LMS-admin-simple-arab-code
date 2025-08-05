import AddPathFrom from "@/features/paths/components/AddPathFrom";
import { useNavigate } from "react-router-dom";

export default function NewAddPath() {
  const nav = useNavigate();
  function onCancel() {
    nav("/admin/paths");
    
  }
  return (
    <div className="!pt-[5rem]">
      <AddPathFrom onSubmit={() => {}} onCancel={onCancel} />
    </div>
  );
}
