export type Coupon = {
  code: string;
  percent: number;
  label: string;
  note?: string;
};

export const COUPONS: Coupon[] = [
  { code: "AUREVRA10", percent: 10, label: "10% Rabatt" },
  { code: "WELCOME15", percent: 15, label: "15% Rabatt", note: "Nur für Neukunden" },
  { code: "FIRSTDROP12", percent: 12, label: "12% Rabatt" },
  { code: "ELEVATE18", percent: 18, label: "18% Rabatt" },
  { code: "AUREVRA20", percent: 20, label: "20% Rabatt" },
  { code: "STYLEUP22", percent: 22, label: "22% Rabatt" },
  { code: "EXCLUSIVE25", percent: 25, label: "25% Rabatt" },
  { code: "VIP30", percent: 30, label: "30% Rabatt", note: "Stammkunden" },
  { code: "BLACKDROP35", percent: 35, label: "35% Rabatt", note: "Special Event" },
  { code: "FINAL40", percent: 40, label: "40% Rabatt", note: "Clearance" },
];

export function findCoupon(code: string): Coupon | null {
  const normalized = code.trim().toUpperCase();
  return COUPONS.find((c) => c.code === normalized) ?? null;
}
