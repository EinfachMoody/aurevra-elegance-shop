import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — AUREVRA" }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Legal</p>
      <h1 className="mt-3 serif text-5xl">Privacy Policy</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>AUREVRA respects your privacy. This demo policy outlines how data would be handled.</p>
        <p>We collect only the information necessary to fulfil your order and improve your experience. Data is never sold to third parties.</p>
        <p>You may request access, correction or deletion of your data at any time by contacting concierge@aurevra.com.</p>
        <p>This is a demonstration site. No personal data is actually processed.</p>
      </div>
    </div>
  ),
});
