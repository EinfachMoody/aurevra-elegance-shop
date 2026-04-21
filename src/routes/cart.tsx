import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { formatPrice, useShop } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Bag — AUREVRA" },
      { name: "description", content: "Review the pieces in your AUREVRA bag." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartDetailed, cartTotal, updateQty, removeFromCart } = useShop();
  const shipping = cartTotal > 250 || cartTotal === 0 ? 0 : 15;

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-16 lg:py-24">
      <div className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Your Selection</p>
        <h1 className="mt-3 serif text-5xl lg:text-6xl">Shopping Bag</h1>
      </div>

      {cartDetailed.length === 0 ? (
        <div className="border-y border-border py-24 text-center">
          <p className="serif text-2xl">Your bag is empty.</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Discover pieces from the new collection.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block bg-foreground px-10 py-4 text-[11px] uppercase tracking-luxe text-background hover:bg-foreground/85"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="divide-y divide-border border-y border-border">
            {cartDetailed.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-5 py-6">
                <Link to="/product/$id" params={{ id: item.productId }} className="block w-24 shrink-0 sm:w-32">
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to="/product/$id"
                        params={{ id: item.productId }}
                        className="text-sm font-medium hover:text-gold"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-[11px] uppercase tracking-luxe text-muted-foreground">
                        {item.product.category} · Size {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
                      aria-label="Remove"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.qty - 1)}
                        className="px-3 py-2 hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.qty + 1)}
                        className="px-3 py-2 hover:bg-muted"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm tabular-nums">{formatPrice(item.product.price * item.qty)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="border border-border p-8">
              <h2 className="serif text-2xl">Order Summary</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">{formatPrice(cartTotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="tabular-nums">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Estimated Tax</dt><dd className="text-muted-foreground">Calculated at checkout</dd></div>
              </dl>
              <div className="my-6 border-t border-border" />
              <div className="flex justify-between text-base">
                <span className="serif text-xl">Total</span>
                <span className="tabular-nums">{formatPrice(cartTotal + shipping)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-8 block bg-foreground py-4 text-center text-[11px] uppercase tracking-luxe text-background hover:bg-foreground/85"
              >
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="mt-4 block text-center text-[11px] uppercase tracking-luxe text-muted-foreground hover:text-foreground">
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
