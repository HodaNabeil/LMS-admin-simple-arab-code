// import { PieChart, Pie, Cell } from "recharts";

// export function CoursesProgressCard({
//   data,
// }: {
//   data: { label: string; color: string; value: number }[];
// }) {
//   return (
//     <div className="w-full flex flex-col items-center">
//       <div className="w-full">
//         <div className="text-base font-bold text-gray-800 mb-8 text-center">
//           متوسط تقدم الدورات
//         </div>
//       </div>
//       {/* Doughnut Chart */}
//       <PieChart width={120} height={120}>
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="label"
//           cx="50%"
//           cy="50%"
//           innerRadius={38}
//           outerRadius={55}
//           paddingAngle={2}
//         >
//           {data.map((entry, idx) => (
//             <Cell key={`cell-${idx}`} fill={entry.color} />
//           ))}
//         </Pie>
//       </PieChart>
//       {/* Legend */}
//       <div className="flex gap-8 items-end justify-center w-full mt-4">
//         {data.map((item, idx) => (
//           <div key={idx} className="flex flex-col items-center gap-1">
//             <span
//               className="inline-block w-8 h-3 rounded"
//               style={{
//                 background: item.color,
//                 border: `1px solid ${item.color}`,
//               }}
//             ></span>
//             <span className="text-sm text-gray-500 mt-1">{item.label}</span>
//             <span className="text-xs text-gray-400">{item.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
