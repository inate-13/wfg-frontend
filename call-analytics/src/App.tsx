import { useState } from "react";
import Header from "./components/layout/Header";
import CallDurationChart from "./components/charts/CallDurationChart";
import SadPathChart from "./components/charts/SadPathChart";
import { callDurationData as defaultData } from "./data/callDuration";
import type { CallDurationPoint } from "./types/analytics";
 
export default function App() {
  const [callData, setCallData] = useState<CallDurationPoint[]>(defaultData);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-14">
        <CallDurationChart
          data={callData}
          onUpdate={setCallData}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <SadPathChart />
        </div>
      </main>
    </div>
  );
}
