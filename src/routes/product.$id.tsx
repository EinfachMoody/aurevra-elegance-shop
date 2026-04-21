import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Truck, RefreshCw, Sparkles } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { formatPrice, useShop } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Piece"} — AUREVRA` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:title", content: `${loaderData?.product.name} — AUREVRA` },
      { property: "og:description", content: loaderData?.product.description ?? "" },
      { property: "og:image", content: loaderData?.product.image ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="px-6 py-24 text-center">
      <p className="serif text-3xl">Piece not found</p>
      <Link to="/shop" className="mt-6 inline-block text-[11px] uppercase tracking-luxe underline">
        Back to Shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const navigate = useNavigate();
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const liked = wishlist.includes(product.id);

  const handleAdd = (goToCart = false) => {
    if (!size) return;
    addToCart(product.id, size, qty);
    if (goToCart) navigate({ to: "/cart" });
  };

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 text-[11px] uppercase tracking-luxe text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="space-y-4">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">{product.category}</p>
          <h1 className="mt-3 serif text-4xl lg:text-5xl">{product.name}</h1>
          <p className="mt-4 text-xl tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-2 text-[11px] uppercase tracking-luxe text-muted-foreground">Inclusive of taxes</p>

          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-luxe">Size</span>
              <button className="text-[11px] uppercase tracking-luxe text-muted-foreground hover:text-foreground">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-14 border px-4 py-3 text-[11px] uppercase tracking-luxe transition ${
                    size === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-[11px] uppercase tracking-luxe">Quantity</span>
            <div className="flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-muted">
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-muted">
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-3">
            <button
              disabled={!size}
              onClick={() => handleAdd(false)}
              className="bg-foreground py-4 text-[11px] uppercase tracking-luxe text-background transition hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {size ? "Add to Cart" : "Select a Size"}
            </button>
            <button
              disabled={!size}
              onClick={() => handleAdd(true)}
              className="flex items-center justify-center gap-2 border border-foreground bg-background py-4 text-[11px] uppercase tracking-luxe transition hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
            >
               Buy with Apple Pay
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="mt-1 flex items-center justify-center gap-2 text-[11px] uppercase tracking-luxe text-muted-foreground hover:text-foreground"
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-foreground text-foreground" : ""}`} />
              {liked ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          <div className="mt-12 space-y-4 border-t border-border pt-8 text-sm text-muted-foreground">
            <div className="flex items-start gap-3"><Truck className="mt-0.5 h-4 w-4 text-gold" /><span>Complimentary delivery within 3–5 business days.</span></div>
            <div className="flex items-start gap-3"><RefreshCw className="mt-0.5 h-4 w-4 text-gold" /><span>30-day returns, exchanges and atelier care.</span></div>
            <div className="flex items-start gap-3"><Sparkles className="mt-0.5 h-4 w-4 text-gold" /><span>Crafted in limited quantity. Numbered piece.</span></div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-6 py-20">
          <h2 className="mb-10 serif text-3xl lg:text-4xl">Pair it with</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
