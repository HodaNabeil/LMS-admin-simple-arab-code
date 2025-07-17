import Sidebar from '@/features/courses/components/Sidebar'
import { Outlet, useParams } from 'react-router-dom'

export default function EditCourse() {
  const { slug } = useParams();
  return (
    <div className="min-h-screen bg-background flex flex-col p-4 gap-4">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur border-b border-muted px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">تعديل الكورس: {slug}</h1>
        <div className="flex items-center gap-2">
          {/* يمكنكِ وضع أزرار أو أكشن هنا */}
          <button className="bg-primary text-white rounded px-4 py-2 text-sm hover:bg-primary/90 transition">حفظ</button>
        </div>
      </header>
      {/* Main Content */}
      <div className="flex flex-1 min-h-0 gap-4">
        <Sidebar />
        <main className="flex-1 overflow-y-auto  border-t border-muted border-r-[1px]   p-4 md:p-8">
          <div className="container max-w-none p-0">
            <Outlet />
            {/* محتوى افتراضي عند عدم وجود children
            <div className="text-center text-gray-600 mt-10">
              <h2 className="text-2xl font-bold mb-2">مرحبًا بك في صفحة إدارة الكورس</h2>
              <p className="mb-4">يمكنك تعديل بيانات الكورس أو إدارة أهدافه من القائمة الجانبية.</p>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  )
}
