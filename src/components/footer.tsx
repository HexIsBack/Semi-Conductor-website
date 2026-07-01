import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line py-14 mt-20">
      <div className="container-page grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="font-[var(--font-display)] font-semibold mb-3">IONFORGE TEST LABS</div>
          <p className="text-sm text-ink-dim max-w-xs">
            Burn-in, ATE, and reliability screening for AI accelerators, PMICs, and
            automotive-grade silicon.
          </p>
        </div>
        <div>
          <div className="tag-label mb-4">Services</div>
          <ul className="space-y-2 text-sm text-ink-dim">
            <li><Link href="/capabilities" className="hover:text-ink">Burn-In Capabilities</Link></li>
            <li><Link href="/sockets" className="hover:text-ink">Socket & Package Support</Link></li>
            <li><Link href="/dashboard" className="hover:text-ink">Live Telemetry Demo</Link></li>
          </ul>
        </div>
        <div>
          <div className="tag-label mb-4">Compliance</div>
          <ul className="space-y-2 text-sm text-ink-dim">
            <li>AEC-Q100</li>
            <li>JESD22-A108</li>
            <li>ISO 9001:2015</li>
          </ul>
        </div>
        <div>
          <div className="tag-label mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-ink-dim">
            <li>quotes@ionforge-test.example</li>
            <li>+1 (555) 019-4420</li>
          </ul>
        </div>
      </div>
      <div className="container-page mt-10 pt-6 border-t border-line text-xs text-ink-dim font-[var(--font-mono)] flex justify-between flex-wrap gap-2">
        <span>© 2026 Ionforge Test Labs.</span>
        <span>Demo site — mock data throughout.</span>
      </div>
    </footer>
  );
}
