import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { LogoWordmark } from "./Logo";

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.6 6.6a5.6 5.6 0 0 1-3.4-1.2 5.6 5.6 0 0 1-2-3.4h-3.4v13.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.4a6 6 0 1 0 5.2 6V9.6c1.4 1 3.1 1.6 5 1.6V8a5.6 5.6 0 0 1-2-1.4z" />
    </svg>
  );
}
function SnapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2c3 0 5 2.2 5 5 0 1 .1 2.4-.2 3.3.5.3 1 .2 1.4 0 .9-.4 1.6.9.7 1.5-.5.4-1.4.6-2 1 .3 1.6 1.6 3.1 3.4 3.4.7.1.7 1.1 0 1.3-1 .3-2 .3-2.5.8-.4.5 0 1.4-.9 1.6-.7.2-1.6-.2-2.4 0-1 .2-1.6 1.2-3 1.2s-2-1-3-1.2c-.8-.2-1.7.2-2.4 0-.9-.2-.5-1.1-.9-1.6-.5-.5-1.5-.5-2.5-.8-.7-.2-.7-1.2 0-1.3 1.8-.3 3.1-1.8 3.4-3.4-.6-.4-1.5-.6-2-1-.9-.6-.2-1.9.7-1.5.4.2.9.3 1.4 0-.3-.9-.2-2.3-.2-3.3 0-2.8 2-5 5-5z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-24">
      <div className="overflow-hidden border-b border-border py-8">
        <div className="marquee-track flex whitespace-nowrap serif text-[14vw] leading-none text-foreground/95">
          <span className="px-8">AUREVRA · Defined by Elegance ·</span>
          <span className="px-8">AUREVRA · Defined by Elegance ·</span>
          <span className="px-8">AUREVRA · Defined by Elegance ·</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <LogoWordmark className="text-xl" />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground max-w-xs">
            A modern house defined by identity, ambition and timeless design.
          </p>
          <div className="mt-6 flex items-center gap-3 text-foreground/70">
            <a href="#" aria-label="Instagram" className="rounded-full border border-border p-2.5 hover:border-gold hover:text-gold transition">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="TikTok" className="rounded-full border border-border p-2.5 hover:border-gold hover:text-gold transition">
              <TikTokIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Snapchat" className="rounded-full border border-border p-2.5 hover:border-gold hover:text-gold transition">
              <SnapIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-luxe text-muted-foreground">House</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Collection</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-luxe text-muted-foreground">Care</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/legal/privacy" className="hover:text-gold">Privacy Policy</Link></li>
            <li><Link to="/legal/terms" className="hover:text-gold">Terms of Service</Link></li>
            <li><Link to="/legal/imprint" className="hover:text-gold">Imprint</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-luxe text-muted-foreground">Newsletter</h4>
          <p className="mt-5 text-sm text-muted-foreground">
            Receive private invitations and seasonal previews.
          </p>
          <form className="mt-4 flex border-b border-foreground" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="text-[11px] uppercase tracking-luxe hover:text-gold">Join</button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-wider-luxe text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} AUREVRA Maison. All rights reserved.</p>
          <p>Crafted in Europe</p>
        </div>
      </div>
    </footer>
  );
}
