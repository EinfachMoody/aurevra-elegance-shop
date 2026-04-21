import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { formatPrice, useShop } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Kasse — AUREVRA" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartDetailed, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [pay, setPay] = useState<"card" | "apple">("card");
  const [done, setDone] = useState(false);
  const shipping = cartTotal > 250 ? 0 : 15;

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-6 py-28 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <h1 className="mt-8 serif text-4xl lg:text-5xl">Vielen Dank.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Deine Bestellung ist eingegangen. Eine Bestätigung wurde an deine E-Mail gesendet.
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-wider-luxe text-muted-foreground">
          Bestellung #AUR-{Math.floor(Math.random() * 900000 + 100000)}
        </p>
        <Link to="/" className="mt-10 inline-block rounded-full bg-foreground px-10 py-4 text-[12px] uppercase tracking-wider-luxe text-background hover:bg-foreground/85">
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  if (cartDetailed.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-28 text-center">
        <p className="serif text-3xl">Dein Warenkorb ist leer.</p>
        <Link to="/shop" className="mt-8 inline-block rounded-full bg-foreground px-10 py-4 text-[12px] uppercase tracking-wider-luxe text-background">
          Kollektion entdecken
        </Link>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setDone(true);
    setTimeout(() => navigate({ to: "/checkout" }), 0);
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-14 lg:px-8">
      <div className="mb-10 text-center">
        <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider-luxe text-gold">
          <Lock className="h-3 w-3" /> Sicherer Checkout
        </p>
        <h1 className="mt-3 serif text-4xl lg:text-5xl">Kasse</h1>
      </div>

      <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-10">
          <Section title="Kontakt">
            <Field label="E-Mail" type="email" required placeholder="du@beispiel.com" />
            <Field label="Telefon" type="tel" placeholder="+49 ..." />
          </Section>

          <Section title="Lieferadresse">
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

          <Section title="Zahlung">
            <div className="grid gap-3 sm:grid-cols-2">
              <PayOption active={pay === "apple"} onClick={() => setPay("apple")} label=" Apple Pay" sub="Schnell & sicher" />
              <PayOption active={pay === "card"} onClick={() => setPay("card")} label="Kreditkarte" sub="Visa · Mastercard · Amex" />
            </div>

            {pay === "card" && (
              <div className="mt-4 space-y-4 rounded-2xl border border-border bg-card p-5">
                <Field label="Kartennummer" placeholder="1234 5678 9012 3456" required />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Gültig bis" placeholder="MM / JJ" required />
                  <Field label="CVC" placeholder="123" required />
                  <Field label="Karteninhaber" required />
                </div>
              </div>
            )}
          </Section>

          <button
            type="submit"
            className="w-full rounded-full bg-foreground py-4 text-[12px] uppercase tracking-wider-luxe text-background hover:bg-foreground/85"
          >
            {pay === "apple" ? " Mit Apple Pay zahlen" : `Bestellung abschließen — ${formatPrice(cartTotal + shipping)}`}
          </button>
          <p className="text-center text-[11px] uppercase tracking-wider-luxe text-muted-foreground">
            Demo-Checkout — es findet keine echte Zahlung statt.
          </p>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-7">
            <h3 className="serif text-xl">Bestellung</h3>
            <ul className="mt-6 divide-y divide-border">
              {cartDetailed.map((i) => (
                <li key={`${i.productId}-${i.size}`} className="flex gap-3 py-4">
                  <div className="aspect-[4/5] w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img src={i.product.image} alt={i.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col text-sm">
                    <span className="font-medium">{i.product.name}</span>
                    <span className="text-[11px] uppercase tracking-wider-luxe text-muted-foreground">Gr. {i.size} · {i.qty}×</span>
                    <span className="mt-auto tabular-nums">{formatPrice(i.product.price * i.qty)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
              <Row label="Zwischensumme" value={formatPrice(cartTotal)} />
              <Row label="Versand" value={shipping === 0 ? "Kostenlos" : formatPrice(shipping)} />
              <div className="my-3 border-t border-border" />
              <div className="flex justify-between text-base">
                <span className="serif text-lg">Gesamt</span>
                <span className="tabular-nums">{formatPrice(cartTotal + shipping)}</span>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 text-[11px] uppercase tracking-wider-luxe text-gold">{title}</h2>
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

function PayOption({ active, onClick, label, sub }: { active: boolean; onClick: () => void; label: string; sub: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${
        active ? "border-foreground bg-secondary" : "border-border hover:border-foreground"
      }`}
    >
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-1 text-[11px] uppercase tracking-wider-luxe text-muted-foreground">{sub}</p>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
