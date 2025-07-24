import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: "هذا الأسبوع",
    label: "هذا الأسبوع",
    value: 30,
    color: "rgb(244, 117, 96)"
  },
  {
    id: "هذا الشهر",
    label: "هذا الشهر",
    value: 120,
    color:"rgb(241, 225, 91)"
  }
];

export default function NewUsersAnalytics() {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        padding: 0,
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
      }}
    >
      <h2
        style={{
          color: 'gray',
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 700,
          fontSize: 18,
          textAlign: 'center',
          letterSpacing: 0.5,
          margin: "1.3rem"
        }}
      >
        المستخدمون الجدد
      </h2>
      <div style={{ width: 220, height: 220 }}>
        <ResponsivePie
          data={data}
          margin={{ top: 10, right: 10, bottom: 40, left: 10 }}
          innerRadius={0.6}
          padAngle={1.5}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ datum: 'data.color' }}
          borderWidth={2}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="gray"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="gray"
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              translateY: 36,
              itemWidth: 100,
              itemHeight: 18,
              symbolShape: 'circle',
              itemTextColor: 'gray'
            }
          ]}
        />
      </div>
    </div>
  );
}

