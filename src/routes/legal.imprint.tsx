import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/imprint")({
  head: () => ({ meta: [{ title: "Imprint — AUREVRA" }] }),
  component: ImprintPage,
});

function ImprintPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Legal</p>
      <h1 className="mt-3 serif text-5xl">Imprint</h1>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="serif text-2xl text-foreground">Company</h2>
          <p className="mt-3">
            AUREVRA Maison GmbH<br />
            Kärntner Ring 12<br />
            1010 Vienna, Austria
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl text-foreground">Management</h2>
          <p className="mt-3">
            <strong className="text-foreground">Mahmoud Lays El-Lahib</strong> — Chief Executive Officer<br />
            <strong className="text-foreground">Osama El-Lahib</strong> — Chairman
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl text-foreground">Contact</h2>
          <p className="mt-3">
            Email: concierge@aurevra.com<br />
            Phone: +43 1 000 00 00
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl text-foreground">Registration</h2>
          <p className="mt-3">
            Commercial Register: FN 000000a<br />
            Court of Registration: Vienna<br />
            VAT ID: ATU00000000
          </p>
        </section>

        <section>
          <h2 className="serif text-2xl text-foreground">Disclaimer</h2>
          <p className="mt-3">
            This site is a fictional demonstration. Any resemblance to real entities is coincidental.
          </p>
        </section>
      </div>
    </div>
  );
}
