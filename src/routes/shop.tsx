import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const categories = ["Alle", "Outerwear", "T-Shirts", "Hoodies", "Oberteile", "Hosen", "Accessoires"] as const;
const sizes = ["XS", "S", "M", "L", "XL"] as const;
const sorts = [
  { v: "featured", l: "Empfohlen" },
  { v: "low", l: "Preis: aufsteigend" },
  { v: "high", l: "Preis: absteigend" },
] as const;

type SearchParams = { c?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    c: typeof s.c === "string" ? s.c : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Kollektion shoppen — AUREVRA" },
      { name: "description", content: "Ready-to-wear, Outerwear und Accessoires. Entdecke die AUREVRA Kollektion." },
      { property: "og:title", content: "Shop — AUREVRA" },
      { property: "og:description", content: "Entdecke die AUREVRA Kollektion." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const cat = (categories as readonly string[]).includes(search.c ?? "")
    ? (search.c as (typeof categories)[number])
    : "Alle";
  const setCat = (c: (typeof categories)[number]) =>
    navigate({ to: "/shop", search: c === "Alle" ? {} : { c } });

  const [size, setSize] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(800);
  const [sort, setSort] = useState<(typeof sorts)[number]["v"]>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (cat !== "Alle" && p.category !== cat) return false;
      if (size && !p.sizes.includes(size)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, size, maxPrice, sort]);

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-[11px] uppercase tracking-wider-luxe text-muted-foreground">Größe</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(size === s ? null : s)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-[11px] transition ${
                size === s
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-wider-luxe">
          <span className="text-muted-foreground">Preis</span>
          <span className="tabular-nums text-foreground">bis €{maxPrice}</span>
        </div>
        <input
          type="range"
          min={50}
          max={800}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-foreground"
        />
      </div>
      <div>
        <p className="mb-3 text-[11px] uppercase tracking-wider-luxe text-muted-foreground">Sortieren</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground"
        >
          {sorts.map((s) => (
            <option key={s.v} value={s.v}>{s.l}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-[1400px] px-6 py-14 text-center lg:py-20">
          <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Die Kollektion</p>
          <h1 className="mt-3 serif text-5xl lg:text-7xl">Atelier · No.01</h1>
          <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground">
            Eine Studie in Zurückhaltung. Pieces, die bleiben sollen — präsentiert ohne Lärm.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-8">
        {/* CATEGORY PILLS — scrollable on mobile */}
        <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-[12px] tracking-wide transition ${
                cat === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* TOOLBAR */}
        <div className="mb-8 flex items-center justify-between gap-4 border-y border-border py-3">
          <p className="text-[12px] text-muted-foreground">
            <span className="text-foreground tabular-nums">{filtered.length}</span> Pieces
          </p>
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[12px] hover:border-foreground"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter & Sortierung
          </button>
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="serif text-2xl">Keine Pieces gefunden.</p>
            <p className="mt-3 text-sm text-muted-foreground">Passe die Filter an, um mehr zu entdecken.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* FILTER DRAWER */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-md bg-background p-6 shadow-luxe animate-fade-in overflow-y-auto">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="serif text-2xl">Filter</h3>
              <button onClick={() => setFiltersOpen(false)} className="rounded-full p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-10 w-full rounded-full bg-foreground py-4 text-[11px] uppercase tracking-wider-luxe text-background"
            >
              {filtered.length} Pieces ansehen
            </button>
            <button
              onClick={() => { setSize(null); setMaxPrice(800); setSort("featured"); }}
              className="mt-3 block w-full text-center text-[11px] uppercase tracking-wider-luxe text-muted-foreground hover:text-foreground"
            >
              Filter zurücksetzen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
