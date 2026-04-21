import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const categories = ["All", "Outerwear", "Tops", "Bottoms", "Accessories"] as const;
const sizes = ["XS", "S", "M", "L", "XL"] as const;
const sorts = ["Featured", "Price: Low → High", "Price: High → Low"] as const;

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop the Collection — AUREVRA" },
      { name: "description", content: "Ready-to-wear, outerwear and accessories. Discover the AUREVRA collection." },
      { property: "og:title", content: "Shop — AUREVRA" },
      { property: "og:description", content: "Discover the AUREVRA collection." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [size, setSize] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(800);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (size && !p.sizes.includes(size)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    if (sort === "Price: Low → High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High → Low") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, size, maxPrice, sort]);

  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:py-20 text-center">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">The Collection</p>
          <h1 className="mt-3 serif text-5xl lg:text-7xl">Atelier · No.01</h1>
          <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground">
            A study in restraint. Pieces designed to last, presented without noise.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 py-12">
        {/* FILTER BAR */}
        <div className="mb-10 flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-luxe">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`pb-1 transition border-b ${
                  cat === c ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-luxe">
              <span className="text-muted-foreground">Size</span>
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(size === s ? null : s)}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] transition ${
                    size === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-[11px] uppercase tracking-luxe text-muted-foreground">
              <span>Price</span>
              <input
                type="range"
                min={50}
                max={800}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 accent-foreground"
              />
              <span className="tabular-nums text-foreground">€{maxPrice}</span>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
              className="border-b border-border bg-transparent py-1 text-[11px] uppercase tracking-luxe outline-none"
            >
              {sorts.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <p className="py-24 text-center text-sm text-muted-foreground">
            No pieces match these filters.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
