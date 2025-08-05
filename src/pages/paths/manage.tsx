import PathForm from "@/features/paths/components/PathForm";
import { useLocation } from "react-router-dom";

function ManagePath() {
  const location = useLocation();
  const pathData = location.state?.path;
  return (
    <main className="pt-20">
      <PathForm pathData={pathData} />
    </main>
  );
}

export default ManagePath;
