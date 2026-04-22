import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { LogoMark, LogoWordmark } from "./Logo";
import { useShop } from "@/lib/store";
import { collections } from "@/lib/collections";

const mainNav = [
  { to: "/shop" as const, label: "Shop" },
  { to: "/shop" as const, label: "Outerwear", search: { c: "Outerwear" } },
  { to: "/shop" as const, label: "T-Shirts", search: { c: "T-Shirts" } },
  { to: "/shop" as const, label: "Hoodies", search: { c: "Hoodies" } },
  { to: "/shop" as const, label: "Hosen", search: { c: "Hosen" } },
  { to: "/shop" as const, label: "Accessoires", search: { c: "Accessoires" } },
];

const tail = [
  { to: "/about" as const, label: "Story" },
  { to: "/contact" as const, label: "Kontakt" },
];

export function Header() {
  const { cartCount, wishlist, openDrawer } = useShop();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-foreground text-background py-2.5 text-[10.5px] tracking-wider-luxe text-center uppercase">
        Kostenloser Versand ab 250 € · Atelier Wien · New Drop : Élan Automne
      </div>

      <header
        className={`sticky top-0 z-40 transition-all ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/60"
            : "bg-background/40 backdrop-blur-md border-b border-transparent"
        }`}
      >
        {/* TOP ROW : Logo center, utilities right */}
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-10 lg:py-5">
          <div className="flex flex-1 items-center gap-3">
            <button
              aria-label="Menü öffnen"
              className="lg:hidden -ml-2 p-2"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
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
            <button
              type="button"
              onClick={openDrawer}
              aria-label="Warenkorb öffnen"
              className="relative rounded-full p-2.5 transition hover:bg-muted"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* SECONDARY NAV : centered categories + collections dropdown */}
        <nav className="hidden lg:flex border-t border-border/40 bg-background/60">
          <div className="mx-auto flex w-full max-w-[1500px] items-center justify-center gap-8 px-10 py-3 text-[11.5px] uppercase tracking-wider-luxe text-muted-foreground">
            {mainNav.map((item) => (
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

            {/* Collections dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button className="inline-flex items-center gap-1 py-1 transition-colors hover:text-foreground">
                Kollektionen <ChevronDown className="h-3 w-3" />
              </button>
              {collectionsOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3 animate-fade-in">
                  <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-background p-3 shadow-luxe">
                    {collections.map((c) => (
                      <Link
                        key={c.id}
                        to="/collection/$slug"
                        params={{ slug: c.slug }}
                        onClick={() => setCollectionsOpen(false)}
                        className="group relative block overflow-hidden rounded-xl"
                      >
                        <div className="aspect-[3/4] overflow-hidden bg-muted">
                          <img
                            src={c.hero}
                            alt={c.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/90 to-transparent p-3 text-background">
                          <p className="text-[9px] uppercase tracking-wider-luxe text-background/70">{c.subtitle}</p>
                          <p className="mt-1 serif text-lg leading-tight">{c.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {tail.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="relative py-1 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm bg-background p-6 animate-fade-in shadow-luxe overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LogoMark className="h-7 w-7" />
                <LogoWordmark className="text-base" />
              </div>
              <button onClick={() => setOpen(false)} aria-label="Menü schließen" className="rounded-full p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-8 mb-3 text-[10px] uppercase tracking-wider-luxe text-muted-foreground">Kollektionen</p>
            <div className="grid grid-cols-3 gap-2">
              {collections.map((c) => (
                <Link
                  key={c.id}
                  to="/collection/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => setOpen(false)}
                  className="group relative block overflow-hidden rounded-lg"
                >
                  <div className="aspect-[3/4] bg-muted">
                    <img src={c.hero} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 to-transparent p-2 flex items-end">
                    <span className="serif text-[11px] text-background leading-tight">{c.name}</span>
                  </div>
                </Link>
              ))}
            </div>

            <p className="mt-8 mb-2 text-[10px] uppercase tracking-wider-luxe text-muted-foreground">Shop</p>
            <nav className="flex flex-col">
              {[...mainNav, ...tail].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  search={(item as { search?: unknown }).search as never}
                  onClick={() => setOpen(false)}
                  className="serif text-2xl py-2.5 border-b border-border/40 hover:text-gold transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              <Link to="/wishlist" onClick={() => setOpen(false)} className="block py-1 hover:text-foreground">Wunschliste</Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="block py-1 hover:text-foreground">Warenkorb</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
