export function SalesLineChart({ data }: { data: number[] }) {
  // رسم المخطط بناءً على البيانات القادمة من الـ API
  // مثال: تحويل البيانات إلى نقاط polyline
  const points = data.map((v, i) => `${i * 40},${100 - v}`).join(" ");
  return (
    <div className="w-full h-40 flex items-end">
      <svg width="100%" height="100%" viewBox="0 0 300 100">
        <polyline
          fill="none"
          stroke="#22d3ee"
          strokeWidth="3"
          points={points}
        />
      </svg>
    </div>
  );
}
