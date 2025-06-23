import { User } from "lucide-react";
import { StatsCard } from "@/features/users/components/StatsCard";
import UsersTable from "@/features/users/components/UsersTable";


const studentsData1 = [
    { date: "2025-06-12", value: 1 },
    { date: "2025-06-16", value: 4 },
    { date: "2025-06-17", value: 1 },

  ];
  const studentsData2 = [

    { date: "2025-06-19", value: 1 },
    { date: "2025-06-12", value: 1 },
    { date: "2025-06-16", value: 10 },
    { date: "2025-06-16", value: 19},
  ];
  const studentsData3 = [
    { date: "2025-06-10", value: 1 },
    { date: "2025-06-11", value: 1 },
    { date: "2025-06-12", value: 1 },
    { date: "2025-06-16", value: 4 },
    { date: "2025-06-17", value: 1 },
    { date: "2025-06-18", value: 1 },
    { date: "2025-06-19", value: 1 },
  ];



export default function Users() {
  return (
    <>
    
    <div className=" grid grid-cols-3 gap-1 p-2">
           <StatsCard
      title="Total Students"
      value={1}
      icon={<User className="w-5 h-5 text-gray-300" />}
      data={studentsData1}
    /> 
        <StatsCard
      title="New Users"
      value={8}
      icon={<User className="w-5 h-5 text-gray-300" />}
      data={studentsData3}
    />
        <StatsCard
      title="Total Users"
      value={5}
      icon={<User className="w-5 h-5 text-gray-300" />}
      data={studentsData2}
    />
  
    </div>
    <UsersTable   /> 
 
    </>

  );
}