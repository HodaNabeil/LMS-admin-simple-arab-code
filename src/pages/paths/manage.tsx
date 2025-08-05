import { useParams } from "react-router-dom";
import PathForm from "@/features/paths/components/PathForm";
import { usePath } from "@/features/paths/hooks/usePathsQueries";
import { Loader } from "@/components/shared/loader";

function ManagePath() {
  const { pathSlug } = useParams<{ pathSlug: string }>();
  const { data, isLoading, error, isError } = usePath(pathSlug);
  if (isLoading) {
    return (
      <div
        style={{ paddingTop: "5rem" }}
        className="flex justify-center items-center min-h-screen"
      >
        <Loader />
      </div>
    );
  }

  if (error || isError) {
    return (
      <div
        style={{ paddingTop: "5rem" }}
        className="flex justify-center items-center min-h-screen"
      >
        <div className="text-red-500">
          <p>Error loading path data</p>
          <p className="text-sm mt-2">Slug: {pathSlug}</p>
          <p className="text-sm">Error: {error?.message || "Unknown error"}</p>
        </div>
      </div>
    );
  }

  if (!error && !isLoading) {
    return (
      <div style={{ paddingTop: "5rem" }}>
        <PathForm pathData={data.data} />
      </div>
    );
  }
}

export default ManagePath;
