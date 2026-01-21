import PathHeader from "@/features/paths/components/PathHeader";
import PathTable from "@/features/paths/components/path-table";


function Paths() {

  return (
    <main className="space-y-6 p-4">
      {/* <PathStats paths={data?.data.paths || []} /> */}
      <PathHeader />
      <PathTable />
    </main>
  );
}

export default Paths;
