import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EditCallDataModal from "../modals/EditCallDataModal";
import type { CallDurationPoint } from "../../types/analytics";
    
interface Props {
  data: CallDurationPoint[];
  onUpdate: (data: CallDurationPoint[]) => void;
}

export default function CallDurationChart({ data, onUpdate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Call Duration</h2>
          <p className="text-sm text-gray-500">Avg duration per call</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit values
        </button>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6ea8ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6ea8ff" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="duration"
            stroke="#6ea8ff"
            fill="url(#durationGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      <EditCallDataModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialData={data}
        onSave={(updated) => {
          onUpdate(updated);
          setOpen(false);
        }}
      />
    </div>
  );
}
