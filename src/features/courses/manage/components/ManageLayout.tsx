import Sidebar from "@/features/courses/manage/components/MangeSidebar";
import { Outlet, useParams } from "react-router-dom";
import Actions from "./Actions";

export default function ManageLayout() {
  const { slug } = useParams();
  return (
    <div className="min-h-screen bg-background flex flex-col p-4 gap-4">
      <header className="sticky top-0 z-30 w-full bg-accent p-4 rounded-md backdrop-blur flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">
          تعديل الكورس: {slug}
        </h1>
        <Actions />
      </header>
      <div className="flex flex-1 min-h-0 gap-4">
        <Sidebar />
        <main className="flex-1 overflow-y-auto  border-t border-muted border-r-[1px] p-4 md:p-8">
          <div className="container max-w-none p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
