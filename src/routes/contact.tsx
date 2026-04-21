import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AUREVRA" },
      { name: "description", content: "Reach the AUREVRA private concierge." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-28">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Private Concierge</p>
        <h1 className="mt-3 serif text-5xl lg:text-6xl">Get in touch</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          For client services, press inquiries or private appointments.
        </p>
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-8 text-sm text-muted-foreground">
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-foreground">Atelier</p>
            <p className="mt-2">AUREVRA Maison<br />Kärntner Ring 12<br />1010 Vienna · Austria</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-foreground">Email</p>
            <p className="mt-2">concierge@aurevra.com</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-foreground">Hours</p>
            <p className="mt-2">Mon — Sat · 10:00 – 19:00</p>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="space-y-5"
        >
          {sent ? (
            <div className="border border-gold/40 bg-secondary p-8 text-center">
              <p className="serif text-2xl">Thank you.</p>
              <p className="mt-3 text-sm text-muted-foreground">A member of our team will be in touch shortly.</p>
            </div>
          ) : (
            <>
              <Field label="Full Name" required />
              <Field label="Email" type="email" required />
              <Field label="Subject" />
              <label className="block">
                <span className="block text-[11px] uppercase tracking-wider-luxe text-muted-foreground">Message</span>
                <textarea
                  required
                  rows={6}
                  className="mt-2 w-full resize-none border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                />
              </label>
              <button className="bg-foreground px-10 py-4 text-[11px] uppercase tracking-luxe text-background hover:bg-foreground/85">
                Send Message
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
      <input {...rest} className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground" />
    </label>
  );
}
