import MostWatchedLessons from './MostWatchedLessons'
import AverageProgressCourse from './AverageProgressCourse'
import MostJoinedCourses from './MostJoinedCourses'

export default function CourseStatistics() {
    return (
        <section className="section-gap" >
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-700 pb-2 border-b-2 border-purple-100">
                    إحصائيات الدورات
                </h2>

                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl  padding-card-statistics shadow-sm border border-gray-100  hover:shadow-md transition-shadow">
                        <MostJoinedCourses />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm padding-card-statistics border border-gray-100  hover:shadow-md transition-shadow">
                        <AverageProgressCourse />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm  padding-card-statistics border border-gray-100  hover:shadow-md transition-shadow">
                    <MostWatchedLessons />
                </div>
            </div>
        </section >
    )
}
