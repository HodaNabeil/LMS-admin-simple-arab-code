import Sidebar from "@/features/courses/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function CreateCourse() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur border-b border-muted px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">إضافة كورس جديد</h1>
        <div className="flex items-center gap-2">
          {/* يمكنكِ وضع أزرار أو أكشن هنا */}
          <button className="bg-primary text-white rounded px-4 py-2 text-sm hover:bg-primary/90 transition">حفظ</button>
        </div>
      </header>
      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-8">
          <div className="container max-w-none p-0">
            <Outlet
          
            />
          </div>
        </main>
      </div>
    </div>
  );
}
