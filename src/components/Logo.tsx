import monogram from "@/assets/aurevra-monogram.jpg";
import wordmark from "@/assets/aurevra-wordmark.jpg";
import lockup from "@/assets/aurevra-lockup.jpg";

/**
 * AUREVRA hat drei Brand-Marks:
 * - Monogram  : kompaktes Symbol, ideal für kleine Flächen, Header, Buttons, Patches
 * - Wordmark  : reiner Schriftzug, ideal für editorial Typo-Sektionen
 * - Lockup    : Symbol + Schriftzug gestapelt, für Hero-Bereiche & Verpackung
 */

type LogoProps = {
  className?: string;
  invert?: boolean;
};

export function LogoMark({ className = "h-8 w-8", invert = false }: LogoProps) {
  return (
    <img
      src={monogram}
      alt="AUREVRA Monogramm"
      className={`${className} object-contain ${
        invert
          ? "invert mix-blend-screen"
          : "mix-blend-multiply dark:invert dark:mix-blend-screen"
      }`}
      width={64}
      height={64}
    />
  );
}

export function LogoWordmarkImage({ className = "h-6", invert = false }: LogoProps) {
  return (
    <img
      src={wordmark}
      alt="AUREVRA"
      className={`${className} object-contain ${
        invert
          ? "invert mix-blend-screen"
          : "mix-blend-multiply dark:invert dark:mix-blend-screen"
      }`}
      width={680}
      height={150}
    />
  );
}

export function LogoLockup({ className = "h-24", invert = false }: LogoProps) {
  return (
    <img
      src={lockup}
      alt="AUREVRA Maison"
      className={`${className} object-contain ${
        invert
          ? "invert mix-blend-screen"
          : "mix-blend-multiply dark:invert dark:mix-blend-screen"
      }`}
      width={980}
      height={1080}
    />
  );
}

/** Schriftbasiertes Wordmark — bleibt für UI-Stellen, an denen ein typografischer Look passender ist als die Bilddatei. */
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
