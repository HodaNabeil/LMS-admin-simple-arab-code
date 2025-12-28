import GeneralStats from "./GeneralStats"
import MostActiveUsersChart from "./MostActiveUsersChart"
import NewUsers from "./NewUsers"


export default function UserStatistics() {
    return (
        <section className=" section-gap" >
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-700 pb-2 border-b-2 border-blue-100">
                    إحصائيات المستخدم
                </h2>

                <GeneralStats />

                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <MostActiveUsersChart />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-slate-600 mb-4 flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            المستخدمين الجدد
                        </h3>
                        <div>
                            <NewUsers />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
