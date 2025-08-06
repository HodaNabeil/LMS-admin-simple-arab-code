import { useParams } from "react-router-dom";
import PathForm from "@/features/paths/components/PathForm";
import { usePath } from "@/features/paths/hooks/usePathsQueries";
import { Loader } from "@/components/shared/loader";

function ManagePath() {
  const { pathSlug } = useParams<{ pathSlug: string }>();
  const { data: path, isPending, error, isError } = usePath(pathSlug);
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{ paddingTop: "5rem" }}
        className="flex justify-center items-center min-h-screen"
      >
        <div className="text-red-500">
          <p>Error loading path data. Please try again later.</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    !isPending &&
    path && (
      <div style={{ paddingTop: "5rem" }}>
        <PathForm pathData={path.data} />
      </div>
    )
  );
}

export default ManagePath;
