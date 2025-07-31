import { useUsers } from "@/hooks/useUsers";
import { CreateNewUser } from "@/features/users/components/CreateNewUser";
import UserTable from "@/features/users/components/UserTable";
import { Loader } from "@/components/shared/loader";
// import StatsCard from "@/components/shared/stats-card";
// import { User2, UserCheck, UserPlus } from "lucide-react";
// const statsData = [
//   {
//     id: "total-students",
//     title: "إجمالي الطلاب",
//     value: 170,
//     icon: User2,
//     growthPercentage: 10,
//     colorClass: "bg-[#8cb0e3] ",
//   },
//   {
//     id: "new-registrations",
//     title: "التسجيلات الجديدة",
//     value: 12,
//     icon: UserPlus,
//     growthPercentage: 10,
//     colorClass: "bg-[#8cb0e3]",
//   },
//   {
//     id: "active-students",
//     title: "الطلاب النشطين (هذا الأسبوع)",
//     value: 55,
//     icon: UserCheck,
//     growthPercentage: 0,
//     colorClass: "bg-[#8cb0e3]",
//   },
// ];
export default function Users() {
  const { data, isLoading, isError } = useUsers();

  let userTable;
  if (isLoading) {
    userTable = (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }
  if (!isLoading && isError) {
    userTable = (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">حدث خطأ أثناء تحميل البيانات</p>
      </div>
    );
  }
  if (!isLoading && data) {
    userTable = (
      <>
        <UserTable users={data.users} />
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-1 p-2">
        {/* <StatsCard
          title="Total Students"
          value={1}
          icon={<User className="w-5 h-5 text-gray-300" />}
          growthPercentage={9}
          className={` bg-[#8cb0e3] card-Statistics`}
        /> */}

        {/* {statsData.map((stat) => (
          <StatsCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={
              <stat.icon className="w-8 h-8 text-white rounded-full p-1 " />
            }
            growthPercentage={stat.growthPercentage}
            className={` ${stat.colorClass} card-Statistics`}
          />
        ))} */}
      </div>

      <div className="flex justify-between items-center m-4">
        <h2 className="text-2xl font-bold text-blue-800">Users</h2>
        <CreateNewUser />
      </div>
      {userTable}
    </>
  );
}
