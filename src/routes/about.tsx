import { createFileRoute } from "@tanstack/react-router";
import story from "@/assets/story-fabric.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — AUREVRA" },
      { name: "description", content: "AUREVRA was built from vision, discipline and identity." },
      { property: "og:title", content: "Our Story — AUREVRA" },
      { property: "og:description", content: "A brand built on identity, ambition and timeless design." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-32">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Manifesto</p>
          <h1 className="mt-4 serif text-5xl leading-[1.05] lg:text-7xl">
            Built from vision.<br />
            <span className="text-gold italic">Defined by presence.</span>
          </h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1200px] gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          <img src={story} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center space-y-6 text-[15px] leading-relaxed text-muted-foreground">
          <p className="text-foreground serif text-2xl leading-snug">
            AUREVRA was built from vision, discipline and identity.
          </p>
          <p>
            What started as an idea became a statement. A house defined by restraint, by precision,
            by a refusal to follow.
          </p>
          <p>
            Every piece is conceived in our atelier and produced in limited numbers across European
            workshops. Materials are selected for longevity. Cuts are studied, then studied again.
          </p>
          <p className="text-foreground">
            This is more than clothing — this is presence.
          </p>
        </div>
      </div>

      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 sm:grid-cols-3">
          {[
            { n: "01", t: "Atelier", d: "Each garment is patterned and refined in-house before production." },
            { n: "02", t: "Origin", d: "Crafted by a small circle of European workshops." },
            { n: "03", t: "Longevity", d: "Designed to outlive seasons. Built to be kept." },
          ].map((p) => (
            <div key={p.n}>
              <p className="text-[11px] uppercase tracking-luxe text-background/50">{p.n}</p>
              <h3 className="mt-3 serif text-3xl">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-background/70">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
