import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getCollection, collections } from "@/lib/collections";
import { getProductsByCollection } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { LogoMark, LogoWordmarkImage, LogoLockup } from "@/components/Logo";

export const Route = createFileRoute("/collection/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    const items = getProductsByCollection(collection.id);
    return { collection, items };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.collection.name ?? "Kollektion"} — AUREVRA` },
      { name: "description", content: loaderData?.collection.description ?? "" },
      { property: "og:title", content: `${loaderData?.collection.name} — AUREVRA` },
      { property: "og:description", content: loaderData?.collection.description ?? "" },
      { property: "og:image", content: loaderData?.collection.hero ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="px-6 py-24 text-center">
      <p className="serif text-3xl">Kollektion nicht gefunden</p>
      <Link
        to="/shop"
        className="mt-6 inline-block rounded-full bg-foreground px-8 py-3 text-[11px] uppercase tracking-wider-luxe text-background"
      >
        Alle Kollektionen
      </Link>
    </div>
  ),
  component: CollectionPage,
});

function CollectionPage() {
  const { collection, items } = Route.useLoaderData();
  const others = collections.filter((c) => c.id !== collection.id);

  return (
    <div>
      {/* Crumbs */}
      <div className="mx-auto max-w-[1500px] px-6 pt-6 text-[11px] uppercase tracking-wider-luxe text-muted-foreground lg:px-10">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="mx-1 inline h-3 w-3" />
        <span className="hover:text-foreground">Kollektionen</span>
        <ChevronRight className="mx-1 inline h-3 w-3" />
        <span className="text-foreground">{collection.name}</span>
      </div>

      {/* HERO */}
      <section className="relative mt-4 h-[80vh] min-h-[560px] w-full overflow-hidden bg-foreground text-background">
        <img
          src={collection.hero}
          alt={collection.name}
          width={1536}
          height={1920}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-foreground/80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center animate-fade-in">
          {collection.logoVariant === "monogram" && <LogoMark className="h-14 w-14 invert opacity-95" />}
          {collection.logoVariant === "wordmark" && <LogoWordmarkImage className="h-7 lg:h-9" invert />}
          {collection.logoVariant === "lockup" && <LogoLockup className="h-24 lg:h-32" invert />}
          <p className="mt-6 text-[11px] uppercase tracking-wider-luxe text-background/70 animate-fade-up">
            {collection.subtitle}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance serif text-5xl leading-[1.02] sm:text-7xl lg:text-8xl animate-fade-up" style={{ animationDelay: "120ms" }}>
            {collection.name}
          </h1>
          <p className="mt-6 max-w-md text-base italic text-background/85 animate-fade-up" style={{ animationDelay: "200ms" }}>
            {collection.tagline}
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
        <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Manifest</p>
        <p className="mt-6 serif text-2xl leading-[1.5] lg:text-3xl">
          {collection.description}
        </p>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-[1500px] px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Pieces</p>
            <h2 className="mt-3 serif text-3xl lg:text-5xl">Die Kollektion</h2>
          </div>
          <p className="text-[11px] uppercase tracking-wider-luxe text-muted-foreground tabular-nums">
            {items.length} Pieces
          </p>
        </div>
        {items.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            Diese Kollektion wird bald enthüllt.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </section>

      {/* OTHER COLLECTIONS */}
      <section className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-[1500px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Weitere Kollektionen</p>
              <h2 className="mt-3 serif text-3xl lg:text-5xl">Entdecke das Maison</h2>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {others.map((c) => (
              <Link
                key={c.id}
                to="/collection/$slug"
                params={{ slug: c.slug }}
                className="group relative block overflow-hidden rounded-2xl bg-foreground"
              >
                <div className="aspect-[5/3] overflow-hidden">
                  <img
                    src={c.hero}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-background">
                  <p className="text-[10px] uppercase tracking-wider-luxe text-background/70">{c.subtitle}</p>
                  <h3 className="mt-2 serif text-3xl lg:text-4xl">{c.name}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-wider-luxe">
                    Entdecken <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
