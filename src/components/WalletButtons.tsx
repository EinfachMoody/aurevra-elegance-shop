import { toast } from "sonner";

type Variant = "stack" | "row";

export function WalletButtons({
  variant = "stack",
  onPay,
}: {
  variant?: Variant;
  onPay?: (method: string) => void;
}) {
  const handle = (method: string) => {
    if (onPay) return onPay(method);
    toast(`${method} — Demo`, {
      description: "Dies ist ein Template. Es wird keine echte Zahlung ausgelöst.",
    });
  };

  const layout =
    variant === "row"
      ? "grid grid-cols-2 gap-2.5 sm:grid-cols-4"
      : "flex flex-col gap-2.5";

  return (
    <div className={layout}>
      {/* Apple Pay */}
      <button
        type="button"
        onClick={() => handle("Apple Pay")}
        aria-label="Mit Apple Pay bezahlen"
        className="group flex h-12 items-center justify-center gap-1.5 rounded-xl bg-black text-white transition hover:bg-black/85 active:scale-[0.99]"
      >
        <span className="text-[15px] leading-none">Buy with</span>
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-white" aria-hidden>
          <path d="M17.05 12.04c-.03-2.84 2.32-4.21 2.43-4.28-1.32-1.93-3.39-2.2-4.12-2.23-1.75-.18-3.42 1.03-4.31 1.03-.9 0-2.27-1.01-3.74-.98-1.92.03-3.69 1.12-4.68 2.83-2 3.46-.51 8.59 1.43 11.41.95 1.38 2.08 2.93 3.55 2.87 1.43-.06 1.97-.92 3.7-.92 1.72 0 2.21.92 3.72.89 1.54-.03 2.51-1.4 3.45-2.79 1.09-1.6 1.54-3.16 1.56-3.24-.03-.01-2.99-1.15-3.02-4.59zm-2.83-8.43c.79-.96 1.32-2.29 1.18-3.61-1.13.05-2.5.76-3.32 1.71-.74.85-1.39 2.21-1.21 3.51 1.27.1 2.55-.65 3.35-1.61z" />
        </svg>
        <span className="ml-0.5 text-[15px] font-medium leading-none">Pay</span>
      </button>

      {/* Google Pay */}
      <button
        type="button"
        onClick={() => handle("Google Pay")}
        aria-label="Mit Google Pay bezahlen"
        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white text-black border border-black/10 shadow-sm transition hover:bg-black/[0.03] active:scale-[0.99]"
      >
        <span className="text-[15px] font-normal leading-none">Buy with</span>
        <span className="flex items-center text-[15px] font-medium leading-none">
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
            <path fill="#4285F4" d="M12.24 10.4v3.32h4.6c-.2 1.18-1.4 3.46-4.6 3.46-2.77 0-5.03-2.29-5.03-5.12s2.26-5.12 5.03-5.12c1.58 0 2.63.67 3.23 1.25l2.2-2.12C16.27 4.78 14.46 4 12.24 4 7.78 4 4.18 7.6 4.18 12.06s3.6 8.06 8.06 8.06c4.65 0 7.74-3.27 7.74-7.87 0-.53-.06-.93-.13-1.35h-7.61z" />
          </svg>
          <span className="ml-0.5">Pay</span>
        </span>
      </button>

      {/* PayPal */}
      <button
        type="button"
        onClick={() => handle("PayPal")}
        aria-label="Mit PayPal bezahlen"
        className="flex h-12 items-center justify-center gap-1 rounded-xl bg-[#FFC439] text-[#003087] transition hover:brightness-95 active:scale-[0.99]"
      >
        <span className="font-bold italic text-[16px] leading-none">Pay</span>
        <span className="font-bold italic text-[16px] leading-none text-[#009CDE]">Pal</span>
      </button>

      {/* Klarna */}
      <button
        type="button"
        onClick={() => handle("Klarna")}
        aria-label="Mit Klarna bezahlen"
        className="flex h-12 items-center justify-center rounded-xl bg-[#FFA8CD] text-black transition hover:brightness-95 active:scale-[0.99]"
      >
        <span className="font-bold tracking-tight text-[15px] leading-none">Klarna.</span>
      </button>
    </div>
  );
}
