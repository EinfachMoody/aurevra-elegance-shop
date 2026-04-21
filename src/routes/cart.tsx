import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { formatPrice, useShop } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Warenkorb — AUREVRA" },
      { name: "description", content: "Überprüfe deine Pieces im AUREVRA Warenkorb." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartDetailed, cartTotal, updateQty, removeFromCart } = useShop();
  const shipping = cartTotal > 250 || cartTotal === 0 ? 0 : 15;

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-14 lg:py-20 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Deine Auswahl</p>
        <h1 className="mt-3 serif text-5xl lg:text-6xl">Warenkorb</h1>
      </div>

      {cartDetailed.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card py-20 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-6 serif text-2xl">Dein Warenkorb ist leer.</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Entdecke Pieces aus der neuen Kollektion.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full bg-foreground px-10 py-4 text-[12px] uppercase tracking-wider-luxe text-background hover:bg-foreground/85"
          >
            Weiter shoppen
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {cartDetailed.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                <Link to="/product/$id" params={{ id: item.productId }} className="block w-24 shrink-0 sm:w-28">
                  <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to="/product/$id"
                        params={{ id: item.productId }}
                        className="text-sm font-medium hover:text-gold"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-[11px] uppercase tracking-wider-luxe text-muted-foreground">
                        {item.product.category} · Größe {item.size}
                      </p>
                      <p className="mt-3 text-sm tabular-nums sm:hidden">{formatPrice(item.product.price * item.qty)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
                      aria-label="Entfernen"
                      className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.qty - 1)}
                        className="rounded-l-full px-3 py-2 hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.qty + 1)}
                        className="rounded-r-full px-3 py-2 hover:bg-muted"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="hidden text-sm tabular-nums sm:block">{formatPrice(item.product.price * item.qty)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 className="serif text-2xl">Zusammenfassung</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Zwischensumme</dt><dd className="tabular-nums">{formatPrice(cartTotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Versand</dt><dd className="tabular-nums">{shipping === 0 ? "Kostenlos" : formatPrice(shipping)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">MwSt.</dt><dd className="text-muted-foreground">an der Kasse</dd></div>
              </dl>
              <div className="my-6 border-t border-border" />
              <div className="flex justify-between text-base">
                <span className="serif text-xl">Gesamt</span>
                <span className="tabular-nums">{formatPrice(cartTotal + shipping)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-7 block rounded-full bg-foreground py-4 text-center text-[12px] uppercase tracking-wider-luxe text-background hover:bg-foreground/85"
              >
                Zur Kasse
              </Link>
              <Link to="/shop" className="mt-4 block text-center text-[11px] uppercase tracking-wider-luxe text-muted-foreground hover:text-foreground">
                Weiter shoppen
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
