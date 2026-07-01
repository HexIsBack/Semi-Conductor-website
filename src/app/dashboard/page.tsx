"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SectionHead } from "@/components/ui";
import { generateTelemetrySeries, generateBathtubCurve, TelemetryPoint } from "@/lib/data";

export default function DashboardPage() {
  const [series, setSeries] = useState<TelemetryPoint[]>(() => generateTelemetrySeries(40, 42));
  const [tick, setTick] = useState(0);
  const bathtub = generateBathtubCurve();

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setSeries((prev) => {
        const last = prev[prev.length - 1];
        const next: TelemetryPoint = {
          t: last.t + 1,
          tempC: clamp(last.tempC + (Math.random() - 0.5) * 2.5, 100, 150),
          voltageV: clamp(last.voltageV + (Math.random() - 0.5) * 0.02, 3.1, 3.5),
          leakageMa: clamp(last.leakageMa + (Math.random() - 0.5) * 0.15, 0.5, 5),
        };
        return [...prev.slice(1), next];
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const current = series[series.length - 1];

  return (
    <div className="container-page py-20">
      <SectionHead
        tag="Live Telemetry (Demo)"
        title="What customers watch while their chips are on stress."
        desc="This is simulated data refreshing on an interval — wire this view up to your real ATE data feed via Supabase Realtime or a WebSocket."
      />

      <div className="grid md:grid-cols-3 gap-6 mb-14">
        <ReadoutCard label="Junction Temperature" value={current ? `${current.tempC}°C` : "—"} tick={tick} />
        <ReadoutCard label="Rail Voltage" value={current ? `${current.voltageV} V` : "—"} tick={tick} />
        <ReadoutCard label="Leakage Current" value={current ? `${current.leakageMa} mA` : "—"} tick={tick} />
      </div>

      <div className="card p-6 md:p-8 mb-10">
        <div className="tag-label mb-6">Temperature — last 40 samples</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(232,230,225,0.08)" />
            <XAxis dataKey="t" tick={{ fill: "#8d96a1", fontSize: 11 }} />
            <YAxis domain={[95, 155]} tick={{ fill: "#8d96a1", fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: "#12161c", border: "1px solid rgba(232,230,225,0.09)", fontSize: 12 }}
            />
            <Line type="monotone" dataKey="tempC" stroke="#FFB300" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-6 md:p-8">
        <div className="tag-label mb-2">Reliability — bathtub curve</div>
        <p className="text-sm text-ink-dim mb-6 max-w-lg">
          Failure rate over 168 hours of continuous stress. The early spike is infant
          mortality — the population this test screens out before shipment.
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={bathtub}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(232,230,225,0.08)" />
            <XAxis dataKey="hour" tick={{ fill: "#8d96a1", fontSize: 11 }} unit="h" />
            <YAxis tick={{ fill: "#8d96a1", fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: "#12161c", border: "1px solid rgba(232,230,225,0.09)", fontSize: 12 }}
            />
            <Area type="monotone" dataKey="failureRate" stroke="#C97C4A" fill="rgba(201,124,74,0.18)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ReadoutCard({ label, value, tick }: { label: string; value: string; tick: number }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="tag-label">{label}</span>
        <span key={tick} className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
      </div>
      <div className="font-[var(--font-mono)] text-2xl">{value}</div>
    </div>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
