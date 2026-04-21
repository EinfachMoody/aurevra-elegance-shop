import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Lock, ShieldCheck, Truck } from "lucide-react";
import { formatPrice, useShop } from "@/lib/store";
import { WalletButtons } from "@/components/WalletButtons";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Kasse — AUREVRA" }],
  }),
  component: CheckoutPage,
});

type Pay = "card" | "paypal" | "klarna" | "sepa";

function CheckoutPage() {
  const { cartDetailed, cartTotal, clearCart } = useShop();
  const [pay, setPay] = useState<Pay>("card");
  const [done, setDone] = useState(false);
  const shipping = cartTotal > 250 ? 0 : 15;
  const tax = Math.round((cartTotal + shipping) * 0.19);
  const total = cartTotal + shipping;

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-6 py-28 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-8 serif text-4xl lg:text-5xl">Vielen Dank.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Deine Bestellung ist eingegangen. Eine Bestätigung wurde an deine E-Mail gesendet.
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-wider-luxe text-muted-foreground">
          Bestellung #AUR-{Math.floor(Math.random() * 900000 + 100000)}
        </p>
        <Link
          to="/"
          className="mt-10 inline-block rounded-full bg-foreground px-10 py-4 text-[12px] uppercase tracking-wider-luxe text-background hover:bg-foreground/85"
        >
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  if (cartDetailed.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-28 text-center">
        <p className="serif text-3xl">Dein Warenkorb ist leer.</p>
        <Link
          to="/shop"
          className="mt-8 inline-block rounded-full bg-foreground px-10 py-4 text-[12px] uppercase tracking-wider-luxe text-background"
        >
          Kollektion entdecken
        </Link>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setDone(true);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-8">
      <div className="mb-10 flex flex-col items-center gap-2 text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[10px] uppercase tracking-wider-luxe text-muted-foreground">
          <Lock className="h-3 w-3" /> Verschlüsselter Checkout
        </p>
        <h1 className="serif text-4xl lg:text-5xl">Kasse</h1>
      </div>

      <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-10">
          {/* Express */}
          <Section step="01" title="Express-Checkout" hint="Schneller bezahlen">
            <WalletButtons variant="row" />
            <div className="relative my-2 flex items-center">
              <div className="h-px flex-1 bg-border" />
              <span className="px-3 text-[10px] uppercase tracking-wider-luxe text-muted-foreground">
                oder mit Daten zahlen
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </Section>

          <Section step="02" title="Kontakt">
            <Field label="E-Mail" type="email" required placeholder="du@beispiel.com" />
            <Field label="Telefon (optional)" type="tel" placeholder="+49 ..." />
          </Section>

          <Section step="03" title="Lieferadresse">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Vorname" required />
              <Field label="Nachname" required />
            </div>
            <Field label="Straße & Hausnummer" required />
            <Field label="Adresszusatz (optional)" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Stadt" required />
              <Field label="PLZ" required />
              <Field label="Land" required defaultValue="Deutschland" />
            </div>
          </Section>

          <Section step="04" title="Zahlungsmethode">
            <div className="grid gap-2.5 sm:grid-cols-2">
              <PayOption
                active={pay === "card"}
                onClick={() => setPay("card")}
                label="Kreditkarte"
                sub="Visa · Mastercard · Amex"
                icons={<CardIcons />}
              />
              <PayOption
                active={pay === "paypal"}
                onClick={() => setPay("paypal")}
                label="PayPal"
                sub="Käuferschutz inklusive"
                icons={<span className="font-bold italic text-[15px] text-[#003087]">Pay<span className="text-[#009CDE]">Pal</span></span>}
              />
              <PayOption
                active={pay === "klarna"}
                onClick={() => setPay("klarna")}
                label="Klarna"
                sub="Später bezahlen · 3 Raten"
                icons={<span className="rounded-md bg-[#FFA8CD] px-2 py-0.5 text-[11px] font-bold text-black">Klarna.</span>}
              />
              <PayOption
                active={pay === "sepa"}
                onClick={() => setPay("sepa")}
                label="SEPA-Lastschrift"
                sub="Direkt vom Konto"
                icons={<span className="text-[11px] font-semibold tracking-wider text-muted-foreground">SEPA</span>}
              />
            </div>

            {pay === "card" && (
              <div className="mt-5 space-y-4 rounded-2xl border border-border bg-card p-5">
                <Field label="Kartennummer" placeholder="1234 5678 9012 3456" required />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Gültig bis" placeholder="MM / JJ" required />
                  <Field label="CVC" placeholder="123" required />
                  <Field label="Karteninhaber" required />
                </div>
              </div>
            )}
            {pay === "sepa" && (
              <div className="mt-5 space-y-4 rounded-2xl border border-border bg-card p-5">
                <Field label="IBAN" placeholder="DE00 0000 0000 0000 0000 00" required />
                <Field label="Kontoinhaber" required />
              </div>
            )}
            {pay === "paypal" && (
              <p className="mt-5 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
                Du wirst nach dem Klick auf „Bestellung abschließen“ zu PayPal weitergeleitet (Demo).
              </p>
            )}
            {pay === "klarna" && (
              <p className="mt-5 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
                Wähle bei Klarna zwischen Sofortzahlung, Rechnung oder 3 zinsfreien Raten (Demo).
              </p>
            )}
          </Section>

          <button
            type="submit"
            className="w-full rounded-full bg-foreground py-4 text-[12px] uppercase tracking-wider-luxe text-background transition hover:bg-foreground/85"
          >
            Bestellung abschließen — {formatPrice(total)}
          </button>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-wider-luxe text-muted-foreground">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> SSL verschlüsselt</span>
            <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Versichert versendet</span>
            <span>Demo-Checkout</span>
          </div>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-7">
            <h3 className="serif text-xl">Bestellung</h3>
            <ul className="mt-6 divide-y divide-border">
              {cartDetailed.map((i) => (
                <li key={`${i.productId}-${i.size}`} className="flex gap-3 py-4">
                  <div className="relative aspect-[4/5] w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img src={i.product.image} alt={i.product.name} className="h-full w-full object-cover" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                      {i.qty}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col text-sm">
                    <span className="font-medium leading-tight">{i.product.name}</span>
                    <span className="text-[11px] uppercase tracking-wider-luxe text-muted-foreground">
                      Gr. {i.size}
                    </span>
                    <span className="mt-auto tabular-nums">{formatPrice(i.product.price * i.qty)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
              <Row label="Zwischensumme" value={formatPrice(cartTotal)} />
              <Row label="Versand" value={shipping === 0 ? "Kostenlos" : formatPrice(shipping)} />
              <Row label="Inkl. MwSt. (19%)" value={formatPrice(tax)} muted />
              <div className="my-3 border-t border-border" />
              <div className="flex items-baseline justify-between">
                <span className="serif text-lg">Gesamt</span>
                <span className="serif text-2xl tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-card p-5 text-sm">
            <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Gutscheincode</p>
            <div className="mt-3 flex gap-2">
              <input
                placeholder="Code eingeben"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground"
              />
              <button
                type="button"
                className="rounded-full border border-border px-5 text-[11px] uppercase tracking-wider-luxe hover:border-foreground"
              >
                Anwenden
              </button>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({
  step,
  title,
  hint,
  children,
}: {
  step: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 flex items-baseline gap-3">
        <span className="text-[11px] tabular-nums tracking-wider-luxe text-gold">{step}</span>
        <h2 className="serif text-2xl">{title}</h2>
        {hint && <span className="ml-auto text-[11px] uppercase tracking-wider-luxe text-muted-foreground">{hint}</span>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider-luxe text-muted-foreground">{label}</span>
      <input
        {...rest}
        className="mt-2 w-full rounded-full border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
      />
    </label>
  );
}

function PayOption({
  active,
  onClick,
  label,
  sub,
  icons,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
  icons?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition ${
        active ? "border-foreground bg-secondary shadow-card" : "border-border hover:border-foreground/50"
      }`}
    >
      <span className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
            active ? "border-foreground" : "border-border"
          }`}
        >
          {active && <span className="h-2 w-2 rounded-full bg-foreground" />}
        </span>
        <span>
          <span className="block text-sm font-medium">{label}</span>
          <span className="mt-0.5 block text-[11px] uppercase tracking-wider-luxe text-muted-foreground">
            {sub}
          </span>
        </span>
      </span>
      {icons && <span className="shrink-0">{icons}</span>}
    </button>
  );
}

function CardIcons() {
  return (
    <span className="flex items-center gap-1">
      <span className="rounded bg-[#1A1F71] px-1.5 py-0.5 text-[9px] font-bold italic text-white">VISA</span>
      <span className="flex">
        <span className="h-3 w-3 rounded-full bg-[#EB001B]" />
        <span className="-ml-1 h-3 w-3 rounded-full bg-[#F79E1B]/90" />
      </span>
    </span>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={muted ? "text-muted-foreground" : "text-muted-foreground"}>{label}</span>
      <span className={`tabular-nums ${muted ? "text-muted-foreground" : ""}`}>{value}</span>
    </div>
  );
}
