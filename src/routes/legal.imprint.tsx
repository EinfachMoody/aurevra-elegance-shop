import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/imprint")({
  head: () => ({ meta: [{ title: "Impressum — AUREVRA" }] }),
  component: ImprintPage,
});

function ImprintPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Rechtliches</p>
      <h1 className="mt-3 serif text-5xl">Impressum</h1>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="serif text-2xl text-foreground">Unternehmen</h2>
          <p className="mt-3">
            AUREVRA Maison GmbH<br />
            Kärntner Ring 12<br />
            1010 Wien, Österreich
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl text-foreground">Geschäftsführung</h2>
          <p className="mt-3">
            <strong className="text-foreground">Mahmoud Lays El-Lahib</strong> — CEO<br />
            <strong className="text-foreground">Osama Al-Lahib</strong> — CEO
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl text-foreground">Kontakt</h2>
          <p className="mt-3">
            E-Mail: concierge@aurevra.com<br />
            Telefon: +43 1 000 00 00
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl text-foreground">Registereintrag</h2>
          <p className="mt-3">
            Firmenbuchnummer: FN 000000a<br />
            Firmenbuchgericht: Wien<br />
            UID-Nummer: ATU00000000
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl text-foreground">Hinweis</h2>
          <p className="mt-3">
            Diese Seite ist eine fiktive Demonstration. Jede Ähnlichkeit mit realen Unternehmen ist zufällig.
          </p>
        </section>
      </div>
    </div>
  );
}
