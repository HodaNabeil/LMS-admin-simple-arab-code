// import { ResponsiveBar } from "@nivo/bar";

// const data = [
//   {
//     course: "React",
//     enrollments: 320,
//   },
//   {
//     course: "Vue",
//     enrollments: 270,
//   },
//   {
//     course: "JavaScript",
//     enrollments: 450,
//   },
//   {
//     course: "Python",
//     enrollments: 390,
//   },
//   {
//     course: "Tailwind CSS",
//     enrollments: 210,
//   },
// ];

// export default function TopCoursesBarChart() {
//   return (
//     <div style={{ height: 400 }}>
//       <ResponsiveBar
//         data={data}
//         keys={["enrollments"]}
//         indexBy="course"
//         margin={{ top: 50, right: 30, bottom: 80, left: 60 }}
//         padding={0.4}
//         valueScale={{ type: "linear" }}
//         indexScale={{ type: "band", round: true }}
//         colors={{ scheme: "set2" }}
//         borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 5,
//           tickPadding: 10,
//           tickRotation: 0,
//           legend: "الدورة",
//           legendPosition: "middle",
//           legendOffset: 60,
//         }}
//         axisLeft={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "عدد المسجلين",
//           legendPosition: "middle",
//           legendOffset: -50,
//         }}
//         labelSkipWidth={12}
//         labelSkipHeight={12}
//         labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
//         animate={true}
//         motionStiffness={90}
//         motionDamping={15}
//         role="application"
//         ariaLabel="Top 5 Courses by Enrollments"
//       />
//     </div>
//   );
// }
