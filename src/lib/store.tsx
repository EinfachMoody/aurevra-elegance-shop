import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";
import { findCoupon, type Coupon } from "./coupons";

export type CartItem = {
  productId: string;
  size: string;
  qty: number;
};

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (productId: string, size: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  cartCount: number;
  cartTotal: number;
  cartDetailed: (CartItem & { product: Product })[];
  drawerOpen: boolean;
  lastAdded: string | null;
  openDrawer: () => void;
  closeDrawer: () => void;
  coupon: Coupon | null;
  discount: number;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
};

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    try {
      const c = localStorage.getItem("aurevra:cart");
      const w = localStorage.getItem("aurevra:wishlist");
      const k = localStorage.getItem("aurevra:coupon");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
      if (k) {
        const found = findCoupon(k);
        if (found) setCoupon(found);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("aurevra:cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("aurevra:wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    if (coupon) localStorage.setItem("aurevra:coupon", coupon.code);
    else localStorage.removeItem("aurevra:coupon");
  }, [coupon, hydrated]);

  const value = useMemo<ShopState>(() => {
    const cartDetailed = cart
      .map((c) => {
        const product = products.find((p) => p.id === c.productId);
        return product ? { ...c, product } : null;
      })
      .filter(Boolean) as (CartItem & { product: Product })[];

    const cartTotal = cartDetailed.reduce((s, i) => s + i.product.price * i.qty, 0);
    const discount = coupon ? Math.round(cartTotal * (coupon.percent / 100)) : 0;

    return {
      cart,
      wishlist,
      cartDetailed,
      cartCount: cart.reduce((s, i) => s + i.qty, 0),
      cartTotal,
      coupon,
      discount,
      applyCoupon: (code: string) => {
        const found = findCoupon(code);
        if (!found) return { ok: false, message: "Ungültiger Gutscheincode." };
        setCoupon(found);
        return { ok: true, message: `${found.label} angewendet.` };
      },
      removeCoupon: () => setCoupon(null),
      drawerOpen,
      lastAdded,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => {
        setDrawerOpen(false);
        setTimeout(() => setLastAdded(null), 300);
      },
      addToCart: (productId, size, qty = 1) => {
        setCart((prev) => {
          const idx = prev.findIndex((p) => p.productId === productId && p.size === size);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = { ...next[idx], qty: next[idx].qty + qty };
            return next;
          }
          return [...prev, { productId, size, qty }];
        });
        setLastAdded(productId);
        setDrawerOpen(true);
      },
      removeFromCart: (productId, size) =>
        setCart((prev) => prev.filter((p) => !(p.productId === productId && p.size === size))),
      updateQty: (productId, size, qty) =>
        setCart((prev) =>
          prev.map((p) =>
            p.productId === productId && p.size === size ? { ...p, qty: Math.max(1, qty) } : p,
          ),
        ),
      clearCart: () => setCart([]),
      toggleWishlist: (productId) =>
        setWishlist((prev) =>
          prev.includes(productId) ? prev.filter((x) => x !== productId) : [...prev, productId],
        ),
    };
  }, [cart, wishlist, drawerOpen, lastAdded]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
