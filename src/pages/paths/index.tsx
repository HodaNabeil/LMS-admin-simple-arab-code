import PathHeader from "@/features/paths/components/PathHeader";
import PathTable from "@/features/paths/components/path-table";


function Paths() {

  return (
    <div className="space-y-6 p-4">
      {/* <PathStats paths={data?.data.paths || []} /> */}
      <PathHeader />
      <PathTable />
    </div>
  );
}

export default Paths;
