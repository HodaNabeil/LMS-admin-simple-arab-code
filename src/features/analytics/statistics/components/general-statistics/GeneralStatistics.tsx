import DailyActiveUsers from './DailyActiveUsers'
import TopFifthCourses from './TopCoursesBarChart'

export default function GeneralStatistics() {
    return (
        <section className="section-gap" >
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-700 pb-2 my-8 border-b-2 border-indigo-100">
                    احصائيات عامة
                </h2>
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm  padding-card-statistics border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <DailyActiveUsers />
                    </div>
                    <div className="bg-white rounded-xl shadow-sm   padding-card-statistics border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <TopFifthCourses />
                    </div>
                </div>
            </div>
        </section >
    )
}
