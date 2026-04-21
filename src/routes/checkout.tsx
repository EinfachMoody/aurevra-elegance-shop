import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { formatPrice, useShop } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout — AUREVRA" }],
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
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <h1 className="mt-8 serif text-4xl lg:text-5xl">Thank you.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Your order has been received. A confirmation has been sent to your email.
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-luxe text-muted-foreground">
          Order #AUR-{Math.floor(Math.random() * 900000 + 100000)}
        </p>
        <Link to="/" className="mt-10 inline-block bg-foreground px-10 py-4 text-[11px] uppercase tracking-luxe text-background hover:bg-foreground/85">
          Return Home
        </Link>
      </div>
    );
  }

  if (cartDetailed.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="serif text-3xl">Your bag is empty.</p>
        <Link to="/shop" className="mt-8 inline-block bg-foreground px-10 py-4 text-[11px] uppercase tracking-luxe text-background">
          Discover the Collection
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
    <div className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="mb-10 text-center">
        <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Secure Checkout</p>
        <h1 className="mt-3 serif text-4xl lg:text-5xl">Checkout</h1>
      </div>

      <form onSubmit={onSubmit} className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-12">
          <Section title="Contact">
            <Field label="Email" type="email" required placeholder="you@example.com" />
            <Field label="Phone" type="tel" placeholder="+43 ..." />
          </Section>

          <Section title="Shipping Address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First Name" required />
              <Field label="Last Name" required />
            </div>
            <Field label="Address" required />
            <Field label="Apartment, suite (optional)" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" required />
              <Field label="Postal Code" required />
              <Field label="Country" required defaultValue="Austria" />
            </div>
          </Section>

          <Section title="Payment">
            <div className="grid gap-3 sm:grid-cols-2">
              <PayOption active={pay === "apple"} onClick={() => setPay("apple")} label=" Apple Pay" sub="Quick & secure" />
              <PayOption active={pay === "card"} onClick={() => setPay("card")} label="Credit Card" sub="Visa · Mastercard · Amex" />
            </div>

            {pay === "card" && (
              <div className="mt-4 space-y-4">
                <Field label="Card Number" placeholder="1234 5678 9012 3456" required />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Expiry" placeholder="MM / YY" required />
                  <Field label="CVC" placeholder="123" required />
                  <Field label="Name on Card" required />
                </div>
              </div>
            )}
          </Section>

          <button
            type="submit"
            className="w-full bg-foreground py-4 text-[11px] uppercase tracking-luxe text-background hover:bg-foreground/85"
          >
            {pay === "apple" ? " Pay with Apple Pay" : `Place Order — ${formatPrice(cartTotal + shipping)}`}
          </button>
          <p className="text-center text-[11px] uppercase tracking-luxe text-muted-foreground">
            Demo checkout — no real payment is processed.
          </p>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="border border-border p-8">
            <h3 className="serif text-xl">Order</h3>
            <ul className="mt-6 divide-y divide-border">
              {cartDetailed.map((i) => (
                <li key={`${i.productId}-${i.size}`} className="flex gap-4 py-4">
                  <div className="aspect-[4/5] w-14 shrink-0 overflow-hidden bg-muted">
                    <img src={i.product.image} alt={i.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col text-sm">
                    <span className="font-medium">{i.product.name}</span>
                    <span className="text-[11px] uppercase tracking-luxe text-muted-foreground">Size {i.size} · Qty {i.qty}</span>
                    <span className="mt-auto tabular-nums">{formatPrice(i.product.price * i.qty)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
              <Row label="Subtotal" value={formatPrice(cartTotal)} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
              <div className="my-3 border-t border-border" />
              <div className="flex justify-between text-base">
                <span className="serif text-lg">Total</span>
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
      <h2 className="mb-5 text-[11px] uppercase tracking-luxe text-muted-foreground">{title}</h2>
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
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none transition focus:border-foreground"
      />
    </label>
  );
}

function PayOption({ active, onClick, label, sub }: { active: boolean; onClick: () => void; label: string; sub: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border p-4 text-left transition ${
        active ? "border-foreground bg-secondary" : "border-border hover:border-foreground"
      }`}
    >
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-1 text-[11px] uppercase tracking-luxe text-muted-foreground">{sub}</p>
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
