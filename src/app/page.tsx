import Link from "next/link";
import { SectionHead, StatCard, Badge } from "@/components/ui";
import { ovens, packageSpecs } from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="container-page pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="tag-label mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber rounded-[1px] shadow-[0_0_8px_#FFB300]" />
              OSAT · Burn-In · ATE
            </div>
            <h1 className="font-[var(--font-display)] font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight mb-6">
              Screen out infant mortality
              <br />
              before it ships.
            </h1>
            <p className="text-ink-dim text-lg max-w-md mb-9">
              Ionforge Test Labs runs static, dynamic, and wafer-level burn-in for AI
              accelerators, PMICs, and automotive-grade silicon — with live telemetry on
              every chip under test.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/capabilities"
                className="font-[var(--font-mono)] text-sm bg-amber text-bg px-6 py-3.5 rounded-[2px] hover:opacity-90 transition inline-flex items-center gap-2"
              >
                View test capabilities →
              </Link>
              <Link
                href="/dashboard"
                className="font-[var(--font-mono)] text-sm border border-line px-6 py-3.5 rounded-[2px] hover:border-ink-dim transition"
              >
                See live dashboard demo
              </Link>
            </div>
          </div>

          <div className="card p-6">
            <div className="tag-label mb-5">Chamber Status</div>
            <div className="space-y-4">
              {ovens.map((o) => {
                const pct = Math.round((o.activeDuts / o.dutSlots) * 100);
                return (
                  <div key={o.id}>
                    <div className="flex justify-between font-[var(--font-mono)] text-xs mb-1.5">
                      <span>{o.name} · {o.mode}</span>
                      <span className="text-amber">{o.activeDuts.toLocaleString()}/{o.dutSlots.toLocaleString()} DUTs</span>
                    </div>
                    <div className="h-1.5 bg-bg-raised-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-copper to-amber rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-line bg-bg-raised">
        <div className="container-page grid grid-cols-2 md:grid-cols-4">
          <StatCard value="19,560" label="DUT slots online" />
          <StatCard value="200°C" label="Max chamber temp" />
          <StatCard value="±0.5%" label="Voltage precision" />
          <StatCard value="< 2" label="Field return DPPM" />
        </div>
      </section>

      {/* CAPABILITIES PREVIEW */}
      <section className="container-page py-24">
        <SectionHead
          tag="Test Methods"
          title="Three ways to stress a die before your customer does."
          desc="Static and dynamic burn-in stay on the board; wafer-level testing catches problems before dies are even packaged."
        />
        <div className="grid md:grid-cols-3 gap-px bg-line border border-line rounded-[3px] overflow-hidden">
          {[
            { title: "Static Burn-In", desc: "Constant thermal and voltage stress with no active input vectors. Cheapest, highest volume." },
            { title: "Dynamic Burn-In", desc: "Active vector patterns exercise real circuit paths while under thermal stress, catching timing-related defects static tests miss." },
            { title: "Wafer-Level (WLTBI)", desc: "Full wafers are stressed before dicing, using micro-force probes rated for sub-0.4mm pitch." },
          ].map((m) => (
            <div key={m.title} className="bg-bg p-8 hover:bg-bg-raised transition-colors">
              <h3 className="font-[var(--font-display)] font-semibold text-lg mb-3">{m.title}</h3>
              <p className="text-sm text-ink-dim leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGE SUPPORT PREVIEW */}
      <section className="bg-bg-raised border-y border-line py-24">
        <div className="container-page">
          <SectionHead
            tag="Socket Support"
            title="Custom test sockets for the package you're actually shipping."
          />
          <div className="flex flex-wrap gap-3 mb-10">
            {Object.keys(packageSpecs).map((p) => (
              <Badge key={p}>{p}</Badge>
            ))}
          </div>
          <Link
            href="/sockets"
            className="font-[var(--font-mono)] text-sm text-amber hover:underline"
          >
            Compare package specs →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-28 text-center">
        <h2 className="font-[var(--font-display)] font-semibold text-3xl md:text-4xl max-w-xl mx-auto mb-6">
          Send us your DUTs, get a reliability curve back.
        </h2>
        <p className="text-ink-dim mb-9 max-w-md mx-auto">
          Most quotes come back within 3 business days with chamber availability and
          per-unit test cost.
        </p>
        <Link
          href="/contact"
          className="font-[var(--font-mono)] text-sm bg-amber text-bg px-7 py-3.5 rounded-[2px] hover:opacity-90 transition inline-flex"
        >
          Request a test quote →
        </Link>
      </section>
    </>
  );
}
