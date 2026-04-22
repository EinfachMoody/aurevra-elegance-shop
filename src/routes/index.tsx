import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-campaign.jpg";
import story from "@/assets/story-fabric.jpg";
import { LogoMark, LogoWordmark, LogoWordmarkImage, LogoLockup } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { getBestsellers, getNewDrops } from "@/lib/products";
import { collections } from "@/lib/collections";
import { ArrowRight, Instagram, Sparkles, Truck, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AUREVRA — Defined by Elegance" },
      {
        name: "description",
        content:
          "AUREVRA. Ein modernes Maison, gegründet auf Identität, Anspruch und zeitlosem Design. Entdecke die neuen Kollektionen Noir Essence, VÉRITÉ Printemps und Élan Automne.",
      },
      { property: "og:title", content: "AUREVRA — Defined by Elegance" },
      {
        property: "og:description",
        content: "Ein modernes Maison. Drei Kollektionen, eine Identität.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const bestsellers = getBestsellers().slice(0, 8);
  const newDrops = getNewDrops().slice(0, 4);
  const featuredCollection = collections[0]; // Noir Essence — gross spotlighten

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[94vh] min-h-[640px] w-full overflow-hidden bg-foreground text-background">
        <img
          src={hero}
          alt="AUREVRA Kampagne"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/10 to-foreground/85" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center animate-fade-in">
          <LogoLockup className="h-28 lg:h-40 animate-fade-up" invert />
          <h1 className="mt-6 max-w-3xl text-balance serif text-5xl leading-[1.02] text-background sm:text-6xl lg:text-8xl animate-fade-up" style={{ animationDelay: "120ms" }}>
            Defined by<br /><span className="italic text-gold">Elegance</span>
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-background/85 animate-fade-up" style={{ animationDelay: "220ms" }}>
            Ein modernes Maison. Drei Kollektionen. Eine Identität.
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
              to="/collection/$slug"
              params={{ slug: "noir-essence" }}
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-background/60 px-8 py-4 text-[12px] uppercase tracking-wider-luxe text-background backdrop-blur-sm transition hover:border-gold hover:text-gold"
            >
              Noir Essence entdecken
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-wider-luxe text-background/60">
          AW · Capsule One · Édition Limitée
        </div>
      </section>

      {/* MARQUEE / META */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-px md:grid-cols-4">
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

      {/* FEATURED COLLECTIONS */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Maison · Drei Kapitel</p>
            <h2 className="mt-3 serif text-4xl lg:text-6xl">Kollektionen</h2>
          </div>
          <Link to="/shop" className="hidden items-center gap-2 text-[12px] uppercase tracking-wider-luxe text-foreground hover:text-gold sm:inline-flex">
            Alle ansehen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {collections.map((c, i) => (
            <Link
              key={c.id}
              to="/collection/$slug"
              params={{ slug: c.slug }}
              className="group relative block overflow-hidden rounded-2xl bg-foreground animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={c.hero}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/15 to-transparent" />
              <div className="absolute inset-x-0 top-0 flex justify-center pt-6 opacity-90 mix-blend-screen">
                {c.logoVariant === "monogram" && <LogoMark className="h-7 w-7" invert />}
                {c.logoVariant === "wordmark" && <LogoWordmarkImage className="h-4" invert />}
                {c.logoVariant === "lockup" && <LogoMark className="h-8 w-8" invert />}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7 text-background">
                <p className="text-[10px] uppercase tracking-wider-luxe text-background/70">{c.subtitle}</p>
                <h3 className="mt-2 serif text-3xl leading-tight lg:text-4xl">{c.name}</h3>
                <p className="mt-2 text-sm italic text-background/85">{c.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-wider-luxe">
                  Entdecken <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW DROP — featured banner */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
            <img
              src={featuredCollection.hero}
              alt={featuredCollection.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute left-5 top-5 rounded-full bg-gold px-4 py-1.5 text-[10px] uppercase tracking-wider-luxe text-gold-foreground">
              New Drop
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Spotlight · {featuredCollection.subtitle}</p>
            <h2 className="mt-4 serif text-4xl leading-[1.05] text-background lg:text-7xl">
              {featuredCollection.name}
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-background/80">
              {featuredCollection.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/collection/$slug"
                params={{ slug: featuredCollection.slug }}
                className="group inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-background px-8 py-4 text-[12px] uppercase tracking-wider-luxe text-foreground transition hover:bg-gold"
              >
                Kollektion öffnen <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>

            {/* New Drop product strip */}
            <div className="mt-12 grid grid-cols-4 gap-3">
              {newDrops.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$id"
                  params={{ id: p.id }}
                  className="group block overflow-hidden rounded-lg bg-background/10"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Most Loved</p>
            <h2 className="mt-3 serif text-4xl lg:text-6xl">Bestsellers</h2>
          </div>
          <Link to="/shop" className="hidden items-center gap-2 text-[12px] uppercase tracking-wider-luxe text-foreground hover:text-gold sm:inline-flex">
            Alle ansehen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {bestsellers.map((p, i) => (
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
        <div className="mx-auto grid max-w-[1500px] gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
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
            <LogoWordmarkImage className="h-5 mb-6 opacity-90" />
            <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Unsere Story</p>
            <h2 className="mt-4 serif text-4xl leading-[1.05] lg:text-6xl">
              Mehr als Mode.<br />
              <span className="italic text-gold">Eine Présence.</span>
            </h2>
            <div className="mt-8 max-w-md space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                AUREVRA wurde aus Vision, Disziplin und Identität geboren. Was als Idee begann, wurde
                zum Statement.
              </p>
              <p className="text-foreground">
                Das ist mehr als Kleidung — das ist Présence.
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

      {/* WORDMARK MARQUEE */}
      <section className="overflow-hidden border-y border-border bg-background py-10">
        <div className="flex items-center justify-center opacity-90">
          <LogoWordmarkImage className="h-10 lg:h-16" />
        </div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-luxe text-muted-foreground">
          Maison · Édition Limitée · Atelier Vienne · Made in Europe
        </p>
      </section>

      {/* SOCIAL */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 text-center lg:px-10">
        <LogoWordmark className="text-xs text-muted-foreground" />
        <p className="mt-6 text-[11px] uppercase tracking-wider-luxe text-gold">Folge dem Maison</p>
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
