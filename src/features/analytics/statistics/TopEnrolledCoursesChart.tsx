// // TopEnrolledCoursesChart.tsx
// "use client";
// import { ResponsiveBar } from "@nivo/bar";

// const data = [
//   { course: "React", students: 120 },
//   { course: "Vue", students: 95 },
//   { course: "Angular", students: 80 },
//   { course: "JavaScript", students: 60 },
//   { course: "Next.js", students: 40 },
// ];

// const TopEnrolledCoursesChart = () => {
//   return (
//     <div style={{ height: 300, width: "100%" }}>
//     <ResponsiveBar
//         data={data}
//         keys={["students"]}
//         indexBy="course"
//         margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//         padding={0.3}
//         colors={{ scheme: "nivo" }}
//         borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
//         axisBottom={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "User",
//           legendPosition: "middle",
//           legendOffset: 32,
//         }}
//         axisLeft={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "Activity",
//           legendPosition: "middle",
//           legendOffset: -40,
//         }}
//         labelSkipWidth={12}
//         labelSkipHeight={12}
//         labelTextColor={{
//           from: "color",
//           modifiers: [["darker", 1.6]],
//         }}

//         animate={true}
//         legends={[
//           {
//             dataFrom: "keys",
//             padding: 10,
//             anchor: "bottom-right",
//             direction: "column",
//             justify: false,
//             translateX: 120,
//             translateY: 0,
//             itemsSpacing: 2,
//             itemWidth: 100,
//             itemHeight: 20,
//             itemDirection: "left-to-right",
//             itemOpacity: 0.85,
//             symbolSize: 20,
//             effects: [
//               {
//                 on: "hover",
//                 style: {
//                   itemOpacity: 0.8,
//                 },
//               },
//             ],
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default TopEnrolledCoursesChart;
