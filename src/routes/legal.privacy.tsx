import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({ meta: [{ title: "Datenschutz — AUREVRA" }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Rechtliches</p>
      <h1 className="mt-3 serif text-5xl">Datenschutz</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>AUREVRA respektiert deine Privatsphäre. Diese Demo-Erklärung beschreibt, wie Daten gehandhabt würden.</p>
        <p>Wir erfassen nur die Informationen, die zur Abwicklung deiner Bestellung und Verbesserung deines Erlebnisses notwendig sind. Daten werden niemals an Dritte verkauft.</p>
        <p>Du kannst jederzeit Auskunft, Korrektur oder Löschung deiner Daten anfordern, indem du uns unter concierge@aurevra.com kontaktierst.</p>
        <p>Dies ist eine Demo-Seite. Es werden keine personenbezogenen Daten tatsächlich verarbeitet.</p>
      </div>
    </div>
  ),
});
