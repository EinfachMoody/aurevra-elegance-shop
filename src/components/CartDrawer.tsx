import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, X, ShoppingBag } from "lucide-react";
import { formatPrice, useShop } from "@/lib/store";

export function CartDrawer({
  open,
  onClose,
  highlightId,
}: {
  open: boolean;
  onClose: () => void;
  highlightId?: string | null;
}) {
  const { cartDetailed, cartTotal, cartCount } = useShop();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <aside
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-luxe animate-slide-in-right"
        role="dialog"
        aria-label="Warenkorb"
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            {highlightId ? (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
                <Check className="h-4 w-4" />
              </span>
            ) : (
              <ShoppingBag className="h-5 w-5" />
            )}
            <div>
              <p className="serif text-lg leading-none">
                {highlightId ? "Hinzugefügt" : "Warenkorb"}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider-luxe text-muted-foreground">
                {cartCount} {cartCount === 1 ? "Piece" : "Pieces"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Schließen"
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartDetailed.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              <p className="mt-5 serif text-2xl">Noch leer.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Entdecke die neue Kollektion.
              </p>
              <Link
                to="/shop"
                onClick={onClose}
                className="mt-6 rounded-full bg-foreground px-8 py-3 text-[11px] uppercase tracking-wider-luxe text-background hover:bg-foreground/85"
              >
                Zum Shop
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartDetailed.map((i) => {
                const isNew = highlightId === i.productId;
                return (
                  <li
                    key={`${i.productId}-${i.size}`}
                    className={`flex gap-4 rounded-2xl border p-3 transition ${
                      isNew ? "border-foreground bg-secondary" : "border-border"
                    }`}
                  >
                    <div className="aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <img
                        src={i.product.image}
                        alt={i.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-tight">{i.product.name}</p>
                        <p className="text-sm tabular-nums">
                          {formatPrice(i.product.price * i.qty)}
                        </p>
                      </div>
                      <p className="mt-1 text-[11px] uppercase tracking-wider-luxe text-muted-foreground">
                        Größe {i.size} · {i.qty}×
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {cartDetailed.length > 0 && (
          <footer className="border-t border-border bg-card px-6 py-5">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">Zwischensumme</span>
              <span className="serif text-xl tabular-nums">{formatPrice(cartTotal)}</span>
            </div>
            <p className="mt-1 text-[11px] uppercase tracking-wider-luxe text-muted-foreground">
              Versand & MwSt. an der Kasse
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                to="/checkout"
                onClick={onClose}
                className="block rounded-full bg-foreground py-3.5 text-center text-[12px] uppercase tracking-wider-luxe text-background hover:bg-foreground/85"
              >
                Zur Kasse
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="block rounded-full border border-border py-3.5 text-center text-[12px] uppercase tracking-wider-luxe hover:border-foreground"
              >
                Warenkorb ansehen
              </Link>
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
}
