 import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { sadPathData } from "../../data/sadPath";

const COLORS = [
  "#6ea8ff",
  "#9ec5fe",
  "#cfe2ff",
  "#e7f1ff",
  "#edf2ff",
];

export default function SadPathChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
     <div className="mb-6">
  <h2 className="text-lg font-semibold">Sad Path Analysis</h2>
  <p className="text-sm text-gray-500">
    Where AI calls break down
  </p>
</div>


     <div className="card flex flex-col items-center text-center">
  <h2 className="text-lg font-semibold mb-1">Sad Path Analysis</h2>
  <p className="text-sm text-gray-500 mb-6">
    Where conversations fail
  </p>

  <div className="w-full h-[260px] flex justify-center">
    <ResponsiveContainer width={260} height={260}>
      <PieChart>
        <Pie
          data={sadPathData}
          innerRadius={80}
          outerRadius={110}
          paddingAngle={4}
          dataKey="value"
        >
          {sadPathData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  <div className="mt-6 space-y-3 w-full max-w-sm">
    {sadPathData.map((item, i) => (
      <div key={item.label} className="flex justify-between text-sm">
        <span className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS[i] }}
          />
          {item.label}
        </span>
        <span className="font-medium">{item.value}%</span>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
