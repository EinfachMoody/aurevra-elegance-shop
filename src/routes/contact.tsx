import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontakt — AUREVRA" },
      { name: "description", content: "Erreiche den AUREVRA Private Concierge." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-16 lg:py-24 lg:px-8">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-wider-luxe text-gold">Private Concierge</p>
        <h1 className="mt-3 serif text-5xl lg:text-6xl">Kontakt</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Für Kundenservice, Presseanfragen oder private Termine.
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-7 text-sm text-muted-foreground">
          <div>
            <p className="text-[11px] uppercase tracking-wider-luxe text-foreground">Atelier</p>
            <p className="mt-2">AUREVRA Maison<br />Kärntner Ring 12<br />1010 Wien · Österreich</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider-luxe text-foreground">E-Mail</p>
            <p className="mt-2">concierge@aurevra.com</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider-luxe text-foreground">Öffnungszeiten</p>
            <p className="mt-2">Mo — Sa · 10:00 – 19:00</p>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5"
        >
          {sent ? (
            <div className="py-10 text-center">
              <p className="serif text-2xl">Vielen Dank.</p>
              <p className="mt-3 text-sm text-muted-foreground">Ein Mitglied unseres Teams meldet sich in Kürze.</p>
            </div>
          ) : (
            <>
              <Field label="Vollständiger Name" required />
              <Field label="E-Mail" type="email" required />
              <Field label="Betreff" />
              <label className="block">
                <span className="block text-[11px] uppercase tracking-wider-luxe text-muted-foreground">Nachricht</span>
                <textarea
                  required
                  rows={5}
                  className="mt-2 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
                />
              </label>
              <button className="rounded-full bg-foreground px-10 py-4 text-[12px] uppercase tracking-wider-luxe text-background hover:bg-foreground/85">
                Nachricht senden
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider-luxe text-muted-foreground">{label}</span>
      <input {...rest} className="mt-2 w-full rounded-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground" />
    </label>
  );
}
