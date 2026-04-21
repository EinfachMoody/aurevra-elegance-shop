import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-campaign.jpg";
import story from "@/assets/story-fabric.jpg";
import { LogoMark, LogoWordmark } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { ArrowRight, Instagram, Sparkles, Truck, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AUREVRA — Defined by Elegance" },
      {
        name: "description",
        content:
          "AUREVRA. Eine Marke, gegründet auf Identität, Anspruch und zeitlosem Design. Entdecke die neue Kollektion.",
      },
      { property: "og:title", content: "AUREVRA — Defined by Elegance" },
      {
        property: "og:description",
        content: "Eine Marke, gegründet auf Identität, Anspruch und zeitlosem Design.",
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
          alt="AUREVRA Kampagne"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/10 to-foreground/80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center animate-fade-in">
          <LogoMark className="h-14 w-14 lg:h-20 lg:w-20 invert opacity-95 animate-fade-up" />
          <LogoWordmark className="mt-5 text-xl lg:text-3xl text-background animate-fade-up" />
          <h1 className="mt-8 max-w-3xl text-balance serif text-5xl leading-[1.02] text-background sm:text-6xl lg:text-8xl animate-fade-up" style={{ animationDelay: "120ms" }}>
            Defined by<br /><span className="italic text-gold">Elegance</span>
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-background/80 animate-fade-up" style={{ animationDelay: "220ms" }}>
            Eine Marke, gegründet auf Identität, Anspruch und zeitlosem Design.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: "320ms" }}>
            <Link
              to="/shop"
              className="group inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-background px-8 py-4 text-[12px] uppercase tracking-wider-luxe text-foreground transition hover:bg-gold hover:text-gold-foreground"
            >
              Jetzt shoppen
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop"
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-background/60 px-8 py-4 text-[12px] uppercase tracking-wider-luxe text-background backdrop-blur-sm transition hover:border-gold hover:text-gold"
            >
              Kollektion entdecken
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-wider-luxe text-background/60">
          AW · Capsule One
        </div>
      </section>

      {/* MARQUEE / META */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px md:grid-cols-4">
          {[
            { i: Sparkles, t: "Atelier-Qualität" },
            { i: Truck, t: "Kostenloser Versand" },
            { i: Shield, t: "30 Tage Rückgabe" },
            { i: LogoMark, t: "Hergestellt in Europa" },
          ].map(({ i: Icon, t }) => (
            <div key={t} className="flex items-center justify-center gap-2.5 py-5 text-[12px] tracking-wide text-muted-foreground">
              <Icon className="h-4 w-4 text-gold" />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-8 lg:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-wider-luxe text-gold">The Edit</p>
            <h2 className="mt-3 serif text-4xl lg:text-6xl">Featured Pieces</h2>
          </div>
          <Link to="/shop" className="hidden items-center gap-2 text-[12px] uppercase tracking-wider-luxe text-foreground hover:text-gold sm:inline-flex">
            Alle ansehen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="mt-12 text-center sm:hidden">
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-[11px] uppercase tracking-wider-luxe text-background">
            Alle ansehen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
            <img
              src={story}
              alt="AUREVRA Stoff"
              loading="lazy"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Unsere Story</p>
            <h2 className="mt-4 serif text-4xl leading-[1.05] lg:text-6xl">
              Mehr als Mode.<br />
              <span className="italic text-gold">Eine Präsenz.</span>
            </h2>
            <div className="mt-8 max-w-md space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                AUREVRA wurde aus Vision, Disziplin und Identität geboren. Was als Idee begann, wurde
                zum Statement.
              </p>
              <p className="text-foreground">
                Das ist mehr als Kleidung — das ist Präsenz.
              </p>
            </div>
            <Link
              to="/about"
              className="group mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-foreground bg-background px-6 py-3 text-[11px] uppercase tracking-wider-luxe transition hover:bg-foreground hover:text-background"
            >
              Manifest lesen
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 text-center lg:px-8">
        <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Folge dem Maison</p>
        <h2 className="mt-3 serif text-4xl lg:text-6xl">@aurevra</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Backstage-Eindrücke, Kampagnen und neue Drops.
        </p>
        <div className="mx-auto mt-8 flex w-fit items-center gap-3">
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
