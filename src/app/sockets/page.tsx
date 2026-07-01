"use client";

import { useState } from "react";
import { SectionHead } from "@/components/ui";
import { packageSpecs, PackageType } from "@/lib/data";

const packages = Object.keys(packageSpecs) as PackageType[];

export default function SocketsPage() {
  const [selected, setSelected] = useState<PackageType>("BGA");
  const spec = packageSpecs[selected];

  return (
    <div className="container-page py-20">
      <SectionHead
        tag="Sockets & Packages"
        title="Pick a package, see the socket spec."
        desc="Test sockets are matched to package geometry and signal speed — tight pitch and high-GHz parts need different hardware than legacy discretes."
      />

      <div className="flex flex-wrap gap-2 mb-10">
        {packages.map((p) => (
          <button
            key={p}
            onClick={() => setSelected(p)}
            className={`font-[var(--font-mono)] text-sm px-4 py-2.5 rounded-[2px] border transition-colors ${
              selected === p
                ? "bg-amber text-bg border-amber"
                : "border-line text-ink-dim hover:border-ink-dim hover:text-ink"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="card p-8 md:p-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="tag-label mb-2">Package</div>
          <div className="font-[var(--font-display)] font-semibold text-2xl">{selected}</div>
        </div>
        <div>
          <div className="tag-label mb-2">Pin Pitch Range</div>
          <div className="font-[var(--font-mono)] text-lg">{spec.pitchRange}</div>
        </div>
        <div>
          <div className="tag-label mb-2">Signal Frequency</div>
          <div className="font-[var(--font-mono)] text-lg">{spec.ghz}</div>
        </div>
        <div className="md:col-span-3 pt-4 border-t border-line">
          <div className="tag-label mb-2">Notes</div>
          <p className="text-sm text-ink-dim leading-relaxed">{spec.notes}</p>
        </div>
      </div>
    </div>
  );
}
