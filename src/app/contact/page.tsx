"use client";

import { useState } from "react";
import { SectionHead } from "@/components/ui";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container-page py-20">
      <SectionHead
        tag="Contact"
        title="Request a test quote."
        desc="Tell us about the part, volume, and timeline — an applications engineer will follow up with chamber availability and cost."
      />

      <div className="grid md:grid-cols-5 gap-14">
        <div className="md:col-span-2">
          <dl className="space-y-6 text-sm">
            <div>
              <dt className="tag-label mb-1">Quotes</dt>
              <dd>quotes@ionforge-test.example</dd>
            </div>
            <div>
              <dt className="tag-label mb-1">General</dt>
              <dd>hello@ionforge-test.example</dd>
            </div>
            <div>
              <dt className="tag-label mb-1">Phone</dt>
              <dd>+1 (555) 019-4420</dd>
            </div>
            <div>
              <dt className="tag-label mb-1">Lab</dt>
              <dd>4400 Lattice Way, Hillsboro, OR 97124</dd>
            </div>
          </dl>
        </div>

        <form
          className="md:col-span-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <Field label="Full name" id="name" required />
            <Field label="Company" id="company" />
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <Field label="Work email" id="email" type="email" required />
            <div>
              <label htmlFor="package" className="block font-[var(--font-mono)] text-xs uppercase tracking-wide text-ink-dim mb-2">
                Package type
              </label>
              <select id="package" className="w-full bg-bg-raised border border-line rounded-[2px] px-4 py-3 text-sm">
                <option>BGA</option>
                <option>QFN</option>
                <option>LGA</option>
                <option>Wafer-Scale CSP</option>
                <option>SOIC</option>
                <option>DFN</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="details" className="block font-[var(--font-mono)] text-xs uppercase tracking-wide text-ink-dim mb-2">
              Project details
            </label>
            <textarea
              id="details"
              rows={5}
              placeholder="Volume, thermal profile needed, test duration, timeline…"
              className="w-full bg-bg-raised border border-line rounded-[2px] px-4 py-3 text-sm resize-y"
            />
          </div>
          <button
            type="submit"
            className="font-[var(--font-mono)] text-sm bg-amber text-bg px-6 py-3.5 rounded-[2px] hover:opacity-90 transition"
          >
            Send request →
          </button>
          <p className="font-[var(--font-mono)] text-xs text-ink-dim mt-4">
            We typically respond within 1–2 business days.
          </p>
          {sent && (
            <div className="mt-5 p-4 border border-line rounded-[2px] font-[var(--font-mono)] text-sm text-amber">
              ✓ Request received — an applications engineer will be in touch shortly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
  required = false,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-[var(--font-mono)] text-xs uppercase tracking-wide text-ink-dim mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className="w-full bg-bg-raised border border-line rounded-[2px] px-4 py-3 text-sm"
      />
    </div>
  );
}
