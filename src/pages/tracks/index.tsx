import { PageHeader } from "@/components/shared/PageHeader";
import { Plus, } from "lucide-react";
import { Routes } from "@/constants/enums";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import TrackTable from "@/features/tracks/components/tarck-table";


function Tracks() {

  return (
    <main className="space-y-6 p-4">
      <PageHeader
        title="جميع التراك "
        icon={Plus}
      >
        <Link
          to={`/${Routes.ADMIN}/${Routes.CREATE_TRACKS}`}
          className={buttonVariants()}
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة تراك جديد
        </Link>
      </PageHeader>
      <TrackTable />
    </main>
  );
}

export default Tracks;
