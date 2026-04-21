import { createFileRoute } from "@tanstack/react-router";
import story from "@/assets/story-fabric.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Unsere Story — AUREVRA" },
      { name: "description", content: "AUREVRA wurde aus Vision, Disziplin und Identität geboren." },
      { property: "og:title", content: "Unsere Story — AUREVRA" },
      { property: "og:description", content: "Eine Marke, gegründet auf Identität, Anspruch und zeitlosem Design." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
          <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Manifest</p>
          <h1 className="mt-4 serif text-5xl leading-[1.05] lg:text-7xl">
            Aus Vision geboren.<br />
            <span className="italic text-gold">Durch Präsenz definiert.</span>
          </h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1200px] gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <img src={story} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center space-y-6 text-[15px] leading-relaxed text-muted-foreground">
          <p className="serif text-2xl leading-snug text-foreground">
            AUREVRA wurde aus Vision, Disziplin und Identität geboren.
          </p>
          <p>
            Was als Idee begann, wurde zum Statement. Ein Maison, definiert durch Zurückhaltung,
            Präzision und die Weigerung, zu folgen.
          </p>
          <p>
            Jedes Piece wird in unserem Atelier konzipiert und in limitierter Auflage in europäischen
            Werkstätten gefertigt. Materialien werden für ihre Langlebigkeit ausgewählt. Schnitte werden
            studiert und erneut studiert.
          </p>
          <p className="text-foreground">
            Das ist mehr als Kleidung — das ist Präsenz.
          </p>
        </div>
      </div>

      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 sm:grid-cols-3 lg:px-8">
          {[
            { n: "01", t: "Atelier", d: "Jedes Kleidungsstück wird im Haus entworfen und verfeinert, bevor es in Produktion geht." },
            { n: "02", t: "Herkunft", d: "Gefertigt von einem kleinen Kreis europäischer Werkstätten." },
            { n: "03", t: "Beständigkeit", d: "Entworfen, um Saisons zu überleben. Gemacht, um zu bleiben." },
          ].map((p) => (
            <div key={p.n}>
              <p className="text-[11px] uppercase tracking-wider-luxe text-gold">{p.n}</p>
              <h3 className="mt-3 serif text-3xl">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-background/70">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
