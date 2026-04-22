import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPrice, useShop } from "@/lib/store";
import type { Product } from "@/lib/products";
import { LogoMark, LogoWordmarkImage } from "./Logo";

/** Dezente Logo-Watermark unten rechts auf dem Produktbild — strategisch nach Kollektion. */
function LogoOverlay({ logo }: { logo: Product["logo"] }) {
  if (!logo || logo === "none") return null;
  if (logo === "wordmark") {
    return (
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex justify-center opacity-70 mix-blend-multiply">
        <LogoWordmarkImage className="h-3" />
      </div>
    );
  }
  if (logo === "lockup") {
    return (
      <div className="pointer-events-none absolute bottom-3 right-3 opacity-80 mix-blend-multiply">
        <LogoMark className="h-7 w-7" />
      </div>
    );
  }
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 opacity-75 mix-blend-multiply">
      <LogoMark className="h-5 w-5" />
    </div>
  );
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { wishlist, toggleWishlist } = useShop();
  const liked = wishlist.includes(product.id);

  return (
    <div
      className="group animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block relative overflow-hidden rounded-2xl bg-muted aspect-[4/5]"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1280}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
        <LogoOverlay logo={product.logo} />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[10px] uppercase tracking-wider-luxe text-foreground backdrop-blur">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label="Zur Wunschliste"
          className="absolute right-3 top-3 rounded-full bg-background/90 p-2.5 backdrop-blur transition hover:bg-background"
        >
          <Heart
            className={`h-4 w-4 transition ${liked ? "fill-foreground text-foreground" : "text-foreground/70"}`}
          />
        </button>
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-full bg-foreground py-3 text-center text-[11px] uppercase tracking-wider-luxe text-background">
            Ansehen
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="block truncate text-sm font-medium tracking-wide hover:text-gold transition"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-[11px] uppercase tracking-wider-luxe text-muted-foreground">
            {product.category}
            {product.fit && <> · {product.fit}</>}
          </p>
        </div>
        <p className="text-sm tabular-nums text-foreground">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
