import { Header } from "@/features/paths/components/Header";
import PathTable from "@/features/paths/components/path-table";
import PathsStats from "@/features/paths/components/PathsStats";

function Paths() {
  return (
    <div className="space-y-6 p-4">
      <Header />

      <PathsStats paths={[]} />

      <PathTable />
    </div>
  );
}

export default Paths;
