import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-campaign.jpg";
import story from "@/assets/story-fabric.jpg";
import { LogoMark, LogoWordmark } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { Instagram } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AUREVRA — Defined by Elegance" },
      {
        name: "description",
        content:
          "AUREVRA. A brand built on identity, ambition and timeless design. Discover the new collection.",
      },
      { property: "og:title", content: "AUREVRA — Defined by Elegance" },
      {
        property: "og:description",
        content: "A brand built on identity, ambition and timeless design.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.slice(0, 8);
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-foreground text-background">
        <img
          src={hero}
          alt="AUREVRA campaign"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/10 to-foreground/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center animate-fade-in">
          <LogoMark className="h-16 w-16 lg:h-24 lg:w-24 invert opacity-95 animate-fade-up" />
          <LogoWordmark className="mt-6 text-2xl lg:text-4xl text-background animate-fade-up" />
          <h1 className="mt-10 max-w-3xl text-balance serif text-4xl leading-[1.05] text-background sm:text-5xl lg:text-7xl animate-fade-up" style={{ animationDelay: "120ms" }}>
            Defined by Elegance
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-background/80 sm:text-base animate-fade-up" style={{ animationDelay: "220ms" }}>
            A brand built on identity, ambition and timeless design.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: "320ms" }}>
            <Link
              to="/shop"
              className="inline-flex min-w-[200px] items-center justify-center bg-background px-8 py-4 text-[11px] uppercase tracking-luxe text-foreground transition hover:bg-gold hover:text-gold-foreground"
            >
              Shop Now
            </Link>
            <Link
              to="/shop"
              className="inline-flex min-w-[200px] items-center justify-center border border-background/70 px-8 py-4 text-[11px] uppercase tracking-luxe text-background transition hover:border-gold hover:text-gold"
            >
              Explore Collection
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-background/60">
          AW · Capsule One
        </div>
      </section>

      {/* MARQUEE / META */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-border md:grid-cols-4">
          {[
            "Atelier Quality",
            "Crafted in Europe",
            "Complimentary Shipping",
            "Private Concierge",
          ].map((t) => (
            <div key={t} className="bg-background py-6 text-center text-[11px] uppercase tracking-luxe text-muted-foreground">
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:py-32">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">The Edit</p>
            <h2 className="mt-3 serif text-4xl lg:text-5xl">Featured Pieces</h2>
          </div>
          <Link to="/shop" className="hidden text-[11px] uppercase tracking-luxe text-foreground hover:text-gold sm:inline-block">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={story}
              alt="AUREVRA fabric"
              loading="lazy"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Our Story</p>
            <h2 className="mt-4 serif text-4xl leading-[1.1] lg:text-6xl">
              More than clothing.<br />
              <span className="text-gold italic">A presence.</span>
            </h2>
            <div className="mt-8 max-w-md space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                AUREVRA was built from vision, discipline and identity. What started as an idea
                became a statement.
              </p>
              <p className="text-foreground">
                This is more than clothing — this is presence.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-10 inline-flex w-fit items-center gap-3 border-b border-foreground pb-1 text-[11px] uppercase tracking-luxe hover:border-gold hover:text-gold"
            >
              Read the Manifesto →
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 text-center">
        <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Follow the House</p>
        <h2 className="mt-3 serif text-4xl lg:text-5xl">@aurevra</h2>
        <div className="mx-auto mt-10 flex w-fit items-center gap-4">
          <a href="#" aria-label="Instagram" className="rounded-full border border-border p-4 transition hover:border-gold hover:text-gold">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" aria-label="TikTok" className="rounded-full border border-border p-4 transition hover:border-gold hover:text-gold">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 6.6a5.6 5.6 0 0 1-3.4-1.2 5.6 5.6 0 0 1-2-3.4h-3.4v13.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.4a6 6 0 1 0 5.2 6V9.6c1.4 1 3.1 1.6 5 1.6V8a5.6 5.6 0 0 1-2-1.4z"/></svg>
          </a>
          <a href="#" aria-label="Snapchat" className="rounded-full border border-border p-4 transition hover:border-gold hover:text-gold">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c3 0 5 2.2 5 5 0 1 .1 2.4-.2 3.3.5.3 1 .2 1.4 0 .9-.4 1.6.9.7 1.5-.5.4-1.4.6-2 1 .3 1.6 1.6 3.1 3.4 3.4.7.1.7 1.1 0 1.3-1 .3-2 .3-2.5.8-.4.5 0 1.4-.9 1.6-.7.2-1.6-.2-2.4 0-1 .2-1.6 1.2-3 1.2s-2-1-3-1.2c-.8-.2-1.7.2-2.4 0-.9-.2-.5-1.1-.9-1.6-.5-.5-1.5-.5-2.5-.8-.7-.2-.7-1.2 0-1.3 1.8-.3 3.1-1.8 3.4-3.4-.6-.4-1.5-.6-2-1-.9-.6-.2-1.9.7-1.5.4.2.9.3 1.4 0-.3-.9-.2-2.3-.2-3.3 0-2.8 2-5 5-5z"/></svg>
          </a>
        </div>
      </section>
    </div>
  );
}
