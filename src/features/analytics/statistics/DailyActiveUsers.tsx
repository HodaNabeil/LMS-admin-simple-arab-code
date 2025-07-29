// import { ResponsiveLine } from "@nivo/line";

// const data = [
//   {
//     id: "المستخدمون النشطون",
//     color: "hsl(205, 70%, 50%)",
//     data: [
//       { x: "السبت", y: 120 },
//       { x: "الأحد", y: 140 },
//       { x: "الإثنين", y: 90 },
//       { x: "الثلاثاء", y: 170 },
//       { x: "الأربعاء", y: 200 },
//       { x: "الخميس", y: 180 },
//       { x: "الجمعة", y: 220 },
//     ],
//   },
// ];

// export default function DailyActiveUsers() {
//   return (
//     <div style={{ height: 400 }}>
//       <ResponsiveLine
//         data={data}
//         margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
//         xScale={{ type: "point" }}
//         yScale={{
//           type: "linear",
//           min: "auto",
//           max: "auto",
//           stacked: false,
//           reverse: false,
//         }}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           orient: "bottom",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: -20,
//           legend: "اليوم",
//           legendOffset: 40,
//           legendPosition: "middle",
//         }}
//         axisLeft={{
//           orient: "left",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "عدد المستخدمين",
//           legendOffset: -50,
//           legendPosition: "middle",
//         }}
//         colors={{ scheme: "category10" }}
//         pointSize={8}
//         pointColor={{ theme: "background" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//         enableSlices="x"
//         legends={[
//           {
//             anchor: "top-left",
//             direction: "row",
//             justify: false,
//             translateX: 0,
//             translateY: -40,
//             itemsSpacing: 10,
//             itemDirection: "left-to-right",
//             itemWidth: 100,
//             itemHeight: 20,
//             itemOpacity: 0.75,
//             symbolSize: 12,
//             symbolShape: "circle",
//             symbolBorderColor: "rgba(0, 0, 0, .5)",
//           },
//         ]}
//       />
//     </div>
//   );
// }
