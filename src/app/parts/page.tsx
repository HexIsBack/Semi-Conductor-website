"use client";

import { useMemo, useState } from "react";
import { SectionHead, StatusPill } from "@/components/ui";
import { parts } from "@/lib/data";

export default function PartsPage() {
  const [category, setCategory] = useState("All");
  const [pkg, setPkg] = useState("All");
  const [query, setQuery] = useState("");

  const categories = ["All", ...new Set(parts.map((p) => p.category))];
  const packages = ["All", ...new Set(parts.map((p) => p.package))];

  const filtered = useMemo(() => {
    return parts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (pkg !== "All" && p.package !== pkg) return false;
      if (query && !p.partNumber.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [category, pkg, query]);

  return (
    <div className="container-page py-20">
      <SectionHead
        tag="Parts Under Test"
        title="Parametric search across active jobs."
        desc="Filter by category, package, or part number. This view mirrors what customers see in their private test portal."
      />

      <div className="flex flex-wrap gap-4 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search part number…"
          className="bg-bg-raised border border-line rounded-[2px] px-4 py-2.5 text-sm min-w-[220px] font-[var(--font-mono)]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-bg-raised border border-line rounded-[2px] px-4 py-2.5 text-sm"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={pkg}
          onChange={(e) => setPkg(e.target.value)}
          className="bg-bg-raised border border-line rounded-[2px] px-4 py-2.5 text-sm"
        >
          {packages.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left font-[var(--font-mono)] text-xs uppercase tracking-wide text-ink-dim">
              <th className="p-4">Part Number</th>
              <th className="p-4">Category</th>
              <th className="p-4">Package</th>
              <th className="p-4">Pins</th>
              <th className="p-4">Pitch</th>
              <th className="p-4">Max Temp</th>
              <th className="p-4">AEC-Q100</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0 hover:bg-bg-raised-2/50">
                <td className="p-4 font-[var(--font-mono)]">{p.partNumber}</td>
                <td className="p-4 text-ink-dim">{p.category}</td>
                <td className="p-4">{p.package}</td>
                <td className="p-4 font-[var(--font-mono)]">{p.pinCount}</td>
                <td className="p-4 font-[var(--font-mono)]">{p.pinPitchMm}mm</td>
                <td className="p-4 font-[var(--font-mono)]">{p.maxTempC}°C</td>
                <td className="p-4">{p.aecQ100 ? "✓" : "—"}</td>
                <td className="p-4"><StatusPill status={p.status} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-ink-dim">
                  No parts match those filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
