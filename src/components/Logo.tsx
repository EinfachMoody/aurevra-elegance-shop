import symbol from "@/assets/aurevra-symbol.jpg";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img
      src={symbol}
      alt="AUREVRA symbol"
      className={`${className} object-contain mix-blend-multiply dark:invert dark:mix-blend-screen`}
      width={64}
      height={64}
    />
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`serif tracking-[0.42em] text-foreground select-none ${className}`}
      style={{ fontWeight: 500 }}
    >
      AUREVRA
    </span>
  );
}
