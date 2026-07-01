// Mock data layer.
// Swap any of these functions for real Supabase queries once you connect a project —
// see src/lib/supabase.ts and README.md for the migration path.

export type PackageType = "BGA" | "QFN" | "LGA" | "Wafer-Scale CSP" | "SOIC" | "DFN";

export type Part = {
  id: string;
  partNumber: string;
  category: "Edge AI / NPU" | "PMIC" | "MCU" | "RF Front-End" | "Memory";
  package: PackageType;
  pinCount: number;
  pinPitchMm: number;
  maxTempC: number;
  voltageV: number;
  aecQ100: boolean;
  status: "In Queue" | "Burning In" | "Passed" | "Failed" | "Retest";
};

export const parts: Part[] = [
  { id: "p1", partNumber: "IF-NPU4402", category: "Edge AI / NPU", package: "BGA", pinCount: 484, pinPitchMm: 0.65, maxTempC: 105, voltageV: 0.9, aecQ100: true, status: "Burning In" },
  { id: "p2", partNumber: "IF-PMIC118", category: "PMIC", package: "QFN", pinCount: 40, pinPitchMm: 0.4, maxTempC: 125, voltageV: 5.0, aecQ100: true, status: "Passed" },
  { id: "p3", partNumber: "IF-MCU220", category: "MCU", package: "LGA", pinCount: 64, pinPitchMm: 0.5, maxTempC: 150, voltageV: 3.3, aecQ100: true, status: "In Queue" },
  { id: "p4", partNumber: "IF-RF77", category: "RF Front-End", package: "DFN", pinCount: 16, pinPitchMm: 0.4, maxTempC: 95, voltageV: 1.8, aecQ100: false, status: "Retest" },
  { id: "p5", partNumber: "IF-NPU9100", category: "Edge AI / NPU", package: "Wafer-Scale CSP", pinCount: 1156, pinPitchMm: 0.35, maxTempC: 110, voltageV: 0.85, aecQ100: false, status: "Burning In" },
  { id: "p6", partNumber: "IF-MEM512", category: "Memory", package: "BGA", pinCount: 200, pinPitchMm: 0.5, maxTempC: 100, voltageV: 1.1, aecQ100: false, status: "Passed" },
  { id: "p7", partNumber: "IF-PMIC220", category: "PMIC", package: "SOIC", pinCount: 8, pinPitchMm: 1.27, maxTempC: 150, voltageV: 12.0, aecQ100: true, status: "Failed" },
  { id: "p8", partNumber: "IF-MCU340", category: "MCU", package: "QFN", pinCount: 32, pinPitchMm: 0.5, maxTempC: 140, voltageV: 3.3, aecQ100: true, status: "Passed" },
];

export type OvenChamber = {
  id: string;
  name: string;
  maxTempC: number;
  dutSlots: number;
  activeDuts: number;
  voltagePrecision: string;
  mode: "Static Burn-In" | "Dynamic Burn-In" | "WLTBI";
};

export const ovens: OvenChamber[] = [
  { id: "o1", name: "Chamber A1", maxTempC: 150, dutSlots: 6000, activeDuts: 5420, voltagePrecision: "±1%", mode: "Dynamic Burn-In" },
  { id: "o2", name: "Chamber A2", maxTempC: 200, dutSlots: 3000, activeDuts: 1180, voltagePrecision: "±0.5%", mode: "Static Burn-In" },
  { id: "o3", name: "Chamber B1", maxTempC: 175, dutSlots: 4500, activeDuts: 4500, voltagePrecision: "±1%", mode: "WLTBI" },
  { id: "o4", name: "Chamber B2", maxTempC: 150, dutSlots: 6000, activeDuts: 2960, voltagePrecision: "±1%", mode: "Dynamic Burn-In" },
];

export const packageSpecs: Record<PackageType, { pitchRange: string; ghz: string; notes: string }> = {
  "BGA": { pitchRange: "0.4mm – 1.0mm", ghz: "up to 12 GHz", notes: "Standard for high pin-count AI and memory packages." },
  "QFN": { pitchRange: "0.4mm – 0.5mm", ghz: "up to 6 GHz", notes: "Low-inductance ground pad, common for PMICs and MCUs." },
  "LGA": { pitchRange: "0.4mm – 0.65mm", ghz: "up to 8 GHz", notes: "Compression contact, no solder joint stress during test." },
  "Wafer-Scale CSP": { pitchRange: "0.3mm – 0.4mm", ghz: "up to 20 GHz", notes: "Requires micro-force probes and per-socket thermal control." },
  "SOIC": { pitchRange: "1.27mm", ghz: "up to 2 GHz", notes: "Legacy high-voltage and discrete power packages." },
  "DFN": { pitchRange: "0.4mm – 0.5mm", ghz: "up to 10 GHz", notes: "Compact RF front-end and sensor packages." },
};

// Simple seeded pseudo-random so charts look consistent between renders/server+client.
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export type TelemetryPoint = {
  t: number;
  tempC: number;
  voltageV: number;
  leakageMa: number;
};

export function generateTelemetrySeries(points = 40, seed = 42): TelemetryPoint[] {
  const rand = seededRandom(seed);
  const series: TelemetryPoint[] = [];
  let temp = 125;
  let voltage = 3.3;
  let leakage = 2.1;
  for (let i = 0; i < points; i++) {
    temp += (rand() - 0.5) * 2.4;
    voltage += (rand() - 0.5) * 0.02;
    leakage += (rand() - 0.5) * 0.15;
    temp = Math.max(100, Math.min(150, temp));
    voltage = Math.max(3.1, Math.min(3.5, voltage));
    leakage = Math.max(0.5, Math.min(5, leakage));
    series.push({
      t: i,
      tempC: Number(temp.toFixed(2)),
      voltageV: Number(voltage.toFixed(3)),
      leakageMa: Number(leakage.toFixed(2)),
    });
  }
  return series;
}

// Reliability "bathtub curve" — infant mortality, useful life, wear-out.
export function generateBathtubCurve(hours = 168): { hour: number; failureRate: number }[] {
  const curve = [];
  for (let h = 0; h <= hours; h += 4) {
    const infant = 8 * Math.exp(-h / 18);
    const wearOut = h > 140 ? Math.pow((h - 140) / 12, 2) * 0.4 : 0;
    const baseline = 0.6;
    curve.push({ hour: h, failureRate: Number((infant + wearOut + baseline).toFixed(2)) });
  }
  return curve;
}
