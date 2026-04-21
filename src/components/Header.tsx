import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { LogoMark, LogoWordmark } from "./Logo";
import { useShop } from "@/lib/store";

const nav = [
  { to: "/shop" as const, label: "Shop" },
  { to: "/shop" as const, label: "Outerwear", search: { c: "Outerwear" } },
  { to: "/shop" as const, label: "Oberteile", search: { c: "Oberteile" } },
  { to: "/shop" as const, label: "Accessoires", search: { c: "Accessoires" } },
  { to: "/about" as const, label: "Story" },
  { to: "/contact" as const, label: "Kontakt" },
];

export function Header() {
  const { cartCount, wishlist } = useShop();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-foreground text-background py-2.5 text-[11px] tracking-wider-luxe text-center uppercase">
        Kostenloser Versand ab 250 € · Atelier Wien
      </div>
      <header
        className={`sticky top-0 z-40 transition-all ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
            : "bg-background/40 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-8 lg:py-5">
          <div className="flex flex-1 items-center gap-3">
            <button
              aria-label="Menü öffnen"
              className="lg:hidden -ml-2 p-2"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden lg:flex items-center gap-7 text-[12px] tracking-wide text-muted-foreground">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  search={item.search as never}
                  className="relative py-1 transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-7 lg:h-9 lg:w-9" />
            <LogoWordmark className="text-base lg:text-xl" />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-0.5 text-foreground">
            <button aria-label="Suchen" className="hidden rounded-full p-2.5 transition hover:bg-muted sm:inline-flex">
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link to="/wishlist" aria-label="Wunschliste" className="relative rounded-full p-2.5 transition hover:bg-muted">
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-gold" />
              )}
            </Link>
            <Link to="/cart" aria-label="Warenkorb" className="relative rounded-full p-2.5 transition hover:bg-muted">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm bg-background p-6 animate-fade-in shadow-luxe">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LogoMark className="h-7 w-7" />
                <LogoWordmark className="text-base" />
              </div>
              <button onClick={() => setOpen(false)} aria-label="Menü schließen" className="rounded-full p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  search={item.search as never}
                  onClick={() => setOpen(false)}
                  className="serif text-3xl py-3 border-b border-border/50 hover:text-gold transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-10 space-y-2 text-sm text-muted-foreground">
              <Link to="/wishlist" onClick={() => setOpen(false)} className="block py-1 hover:text-foreground">Wunschliste</Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="block py-1 hover:text-foreground">Warenkorb</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
