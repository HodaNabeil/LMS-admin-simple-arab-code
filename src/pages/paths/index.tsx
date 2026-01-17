import PathHeader from "@/features/paths/components/PathHeader";
import PathTable from "@/features/paths/components/path-table";
import PathStats from "@/features/paths/components/PathStats";
import { usePaths } from "@/features/paths/hooks/usePathsQueries";
import { Loader } from "@/components/shared/loader";

function Paths() {
  const { data, isPending, isError, error } = usePaths();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        {error?.message || "حدث خطأ أثناء تحميل البيانات"}
      </div>
    );
  }

  return (
    <main className="space-y-6 p-4">
      <PathStats paths={data?.paths || []} />
      <PathHeader />
      <PathTable paths={data?.paths || []} isLoading={isPending} />
    </main>
  );
}

export default Paths;
