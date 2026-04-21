import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wunschliste — AUREVRA" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-14 lg:py-20 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Gespeicherte Pieces</p>
        <h1 className="mt-3 serif text-5xl lg:text-6xl">Wunschliste</h1>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card py-20 text-center">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-6 serif text-2xl">Noch nichts gespeichert.</p>
          <Link to="/shop" className="mt-8 inline-block rounded-full bg-foreground px-10 py-4 text-[12px] uppercase tracking-wider-luxe text-background hover:bg-foreground/85">
            Kollektion entdecken
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
