import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({ meta: [{ title: "AGB — AUREVRA" }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Rechtliches</p>
      <h1 className="mt-3 serif text-5xl">AGB</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>Mit dem Zugriff auf AUREVRA stimmst du diesen Demo-Bedingungen zu.</p>
        <p>Alle Inhalte, Bilder und gezeigten Pieces sind Teil eines fiktiven Markenerlebnisses zu Demonstrationszwecken.</p>
        <p>Es werden keine Käufe über diese Seite tatsächlich abgewickelt und keine Zahlungsinformationen erfasst oder gespeichert.</p>
        <p>Bei Fragen kontaktiere bitte concierge@aurevra.com.</p>
      </div>
    </div>
  ),
});
