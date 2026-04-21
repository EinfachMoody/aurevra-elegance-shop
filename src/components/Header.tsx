import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { LogoMark, LogoWordmark } from "./Logo";
import { useShop } from "@/lib/store";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Women", search: { category: "Tops" as const } },
  { to: "/shop", label: "Men", search: { category: "Outerwear" as const } },
  { to: "/about", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { cartCount } = useShop();
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
      <div className="bg-foreground text-background py-2 text-[11px] tracking-luxe text-center uppercase">
        Complimentary shipping on orders over €250 · Atelier Vienna
      </div>
      <header
        className={`sticky top-0 z-40 border-b border-border/60 backdrop-blur-md transition-colors ${
          scrolled ? "bg-background/90" : "bg-background/60"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:py-5">
          <div className="flex flex-1 items-center gap-3">
            <button
              aria-label="Open menu"
              className="lg:hidden -ml-2 p-2"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-luxe text-muted-foreground">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  search={item.search as never}
                  className="transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" className="flex items-center gap-2">
            <LogoMark className="h-7 w-7 lg:h-9 lg:w-9" />
            <LogoWordmark className="text-base lg:text-xl" />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-1 lg:gap-2 text-foreground">
            <button aria-label="Search" className="p-2 hidden sm:inline-flex hover:opacity-70">
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="p-2 hover:opacity-70">
              <Heart className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative p-2 hover:opacity-70">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
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
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[82%] max-w-sm bg-background p-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <LogoWordmark className="text-lg" />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-6 text-sm uppercase tracking-wider-luxe">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  search={item.search as never}
                  onClick={() => setOpen(false)}
                  className="border-b border-border pb-4"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
