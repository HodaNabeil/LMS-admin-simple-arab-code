import { Header } from "@/features/paths/components/Header";
import PathTable from "@/features/paths/components/path-table";

function Paths() {
  return (
    <div className="space-y-6 p-4">
      <Header pathsCount={0} />
      {/* <PathsStats /> */}
      <PathTable />
    </div>
  );
}

export default Paths;
