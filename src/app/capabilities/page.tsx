import { SectionHead, Badge } from "@/components/ui";
import { ovens } from "@/lib/data";

export default function CapabilitiesPage() {
  return (
    <div className="container-page py-20">
      <SectionHead
        tag="Burn-In Capabilities"
        title="Capacity and stress limits, by chamber."
        desc="Every chamber is independently controlled and logged. Numbers below reflect current configuration, not theoretical maximums."
      />

      <div className="overflow-x-auto card mb-20">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left font-[var(--font-mono)] text-xs uppercase tracking-wide text-ink-dim">
              <th className="p-4">Chamber</th>
              <th className="p-4">Mode</th>
              <th className="p-4">Max Temp</th>
              <th className="p-4">Voltage Precision</th>
              <th className="p-4">DUT Slots</th>
              <th className="p-4">Utilization</th>
            </tr>
          </thead>
          <tbody>
            {ovens.map((o) => (
              <tr key={o.id} className="border-b border-line last:border-0">
                <td className="p-4 font-medium">{o.name}</td>
                <td className="p-4 text-ink-dim">{o.mode}</td>
                <td className="p-4 font-[var(--font-mono)]">{o.maxTempC}°C</td>
                <td className="p-4 font-[var(--font-mono)]">{o.voltagePrecision}</td>
                <td className="p-4 font-[var(--font-mono)]">{o.dutSlots.toLocaleString()}</td>
                <td className="p-4 font-[var(--font-mono)] text-amber">
                  {Math.round((o.activeDuts / o.dutSlots) * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-line border border-line rounded-[3px] overflow-hidden mb-20">
        <div className="bg-bg p-8">
          <h3 className="font-[var(--font-display)] font-semibold text-lg mb-3">Thermal range</h3>
          <p className="text-sm text-ink-dim leading-relaxed mb-4">
            Standard chambers run 100–150°C. Two chambers are rated to 200°C for GaN and
            SiC power devices that need higher junction stress.
          </p>
          <Badge>100°C – 200°C</Badge>
        </div>
        <div className="bg-bg p-8">
          <h3 className="font-[var(--font-display)] font-semibold text-lg mb-3">Electrical precision</h3>
          <p className="text-sm text-ink-dim leading-relaxed mb-4">
            Per-socket voltage regulation holds ±0.5–1% across the full DUT population,
            with continuous current leakage monitoring.
          </p>
          <Badge>±0.5% – ±1%</Badge>
        </div>
        <div className="bg-bg p-8">
          <h3 className="font-[var(--font-display)] font-semibold text-lg mb-3">Throughput</h3>
          <p className="text-sm text-ink-dim leading-relaxed mb-4">
            19,560 DUT slots online across four chambers, with individual per-socket
            micro-heaters preventing hot-spot variance.
          </p>
          <Badge>6,000 DUTs / chamber max</Badge>
        </div>
      </div>

      <div className="card p-8 md:p-10">
        <h3 className="font-[var(--font-display)] font-semibold text-xl mb-4">Standards we test to</h3>
        <div className="flex flex-wrap gap-3">
          <Badge>AEC-Q100 (Automotive)</Badge>
          <Badge>JESD22-A108 (JEDEC burn-in)</Badge>
          <Badge>ISO 9001:2015</Badge>
          <Badge>ANSI/ESD S20.20</Badge>
        </div>
      </div>
    </div>
  );
}
