import { Pages, Routes } from "@/constants/enums";
import AddPathFrom from "@/features/paths/create/components/PathFrom";
import { useNavigate } from "react-router-dom";

export default function CreateNewPath() {
  const navigate = useNavigate();
  function onCancel() {
    navigate(`/${Routes.ADMIN}/${Pages.PATHS}`);
  }
  return (
    <main className="pt-20">
      <AddPathFrom onSubmit={() => {}} onCancel={onCancel} />
    </main>
  );
}
