import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  { name: "نورة سعد", role: "مراجع", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "محمد عبدالعزيز", role: "مدير التسويق", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "عبدالرحمن يوسف", role: "مدير المالية", img: "https://randomuser.me/api/portraits/men/46.jpg" },
  { name: "محمد ياسر", role: "مدير إدارة المحتوى", img: "https://randomuser.me/api/portraits/men/47.jpg" },
  { name: "Alex", role: "المسؤول التقني", img: "https://randomuser.me/api/portraits/men/48.jpg" },
];

export default function TeamList() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-lg">فريق سبان</span>
        <button className="text-blue-500 text-xl font-bold">+</button>
      </div>
      <ul className="space-y-2">
        {teamMembers.map((member, idx) => (
          <li key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
            <Avatar className="w-10 h-10">
              <AvatarImage src={member.img} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-right">
              <span className="font-semibold text-sm">{member.name}</span>
              <span className="text-xs text-gray-500">{member.role}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
