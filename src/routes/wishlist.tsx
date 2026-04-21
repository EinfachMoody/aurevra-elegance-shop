import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — AUREVRA" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:py-24">
      <div className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Saved Pieces</p>
        <h1 className="mt-3 serif text-5xl lg:text-6xl">Wishlist</h1>
      </div>

      {items.length === 0 ? (
        <div className="border-y border-border py-24 text-center">
          <p className="serif text-2xl">Nothing saved yet.</p>
          <Link to="/shop" className="mt-8 inline-block bg-foreground px-10 py-4 text-[11px] uppercase tracking-luxe text-background hover:bg-foreground/85">
            Discover the Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
