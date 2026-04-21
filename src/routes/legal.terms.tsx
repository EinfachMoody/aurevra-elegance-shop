import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({ meta: [{ title: "Terms — AUREVRA" }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Legal</p>
      <h1 className="mt-3 serif text-5xl">Terms of Service</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>By accessing AUREVRA you agree to these demonstration terms.</p>
        <p>All content, imagery and pieces shown are part of a fictional brand experience created for demonstration purposes.</p>
        <p>No purchases made through this site are processed and no payment information is collected or stored.</p>
        <p>For questions please contact concierge@aurevra.com.</p>
      </div>
    </div>
  ),
});
