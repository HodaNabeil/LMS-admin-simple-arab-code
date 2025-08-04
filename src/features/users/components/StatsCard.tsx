// import { Card } from "@/components/ui/card";
// import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
// import React from "react";

// interface StatsCardProps {
//   title: string;
//   value: number | string;
//   icon: React.ReactNode;
//   data: { date: string; value: number }[];
// }

// export function StatsCard({ title, value, icon, data }: StatsCardProps) {
//   return (
//     <Card className="bg-white text-gray-800 p-4 h-full shadow-sm border border-gray-100">
//       <div className="flex items-center gap-2 mb-2">
//         {icon}
//         <span className="text-sm font-medium">{title}</span>
//       </div>
//       <div className="text-2xl font-bold mb-2">{value}</div>
//       <div className="h-16">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke="#6366f1"
//               strokeWidth={2}
//               dot={{ r: 4, fill: "#818cf8" }}
//               name={title}
//             />
//             <Tooltip
//               labelFormatter={(label) => label}
//               formatter={(v) => [`${v}`, title]}
//               contentStyle={{
//                 background: "#fff",
//                 border: "1px solid #e5e7eb",
//                 color: "#1e293b",
//               }}
//               labelStyle={{ color: "#1e293b" }}
//               itemStyle={{ color: "#1e293b" }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   );
// }
