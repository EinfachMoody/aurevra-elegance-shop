import hoodie from "@/assets/product-hoodie-black.jpg";
import tee from "@/assets/product-tee-cream.jpg";
import jacket from "@/assets/product-jacket-black.jpg";
import pants from "@/assets/product-pants-black.jpg";
import coat from "@/assets/product-coat-beige.jpg";
import knit from "@/assets/product-knit-grey.jpg";
import shirt from "@/assets/product-shirt-silk.jpg";
import bag from "@/assets/product-bag-leather.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Outerwear" | "Tops" | "Bottoms" | "Accessories";
  image: string;
  description: string;
  sizes: string[];
};

export const products: Product[] = [
  {
    id: "essential-hoodie",
    name: "Aurevra Essential Hoodie",
    price: 189,
    category: "Tops",
    image: hoodie,
    description:
      "Cut from heavyweight brushed cotton with a relaxed silhouette. The Essential Hoodie is the foundation of the AUREVRA wardrobe — quiet, considered, made to outlast the season.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "atelier-tee",
    name: "Atelier Cotton Tee",
    price: 89,
    category: "Tops",
    image: tee,
    description:
      "A refined essential in compact organic cotton, garment-dyed for a subtle off-white tone. Tailored shoulders, clean neckline.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "noir-bomber",
    name: "Noir Bomber Jacket",
    price: 449,
    category: "Outerwear",
    image: jacket,
    description:
      "A modern bomber in technical satin with a sculpted collar and matte hardware. Engineered drape, cinematic finish.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "wide-trouser",
    name: "Studio Wide-Leg Trouser",
    price: 219,
    category: "Bottoms",
    image: pants,
    description:
      "High-rise wool blend trouser with a fluid wide leg and pressed crease. Tailored in Portugal.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "camel-coat",
    name: "Maison Long Coat",
    price: 729,
    category: "Outerwear",
    image: coat,
    description:
      "A double-faced wool coat in warm camel. Minimal lapel, single-breasted closure, floor-grazing length.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "merino-knit",
    name: "Merino Crew Knit",
    price: 169,
    category: "Tops",
    image: knit,
    description:
      "Fine-gauge merino wool with a refined ribbed collar. Soft-touch finish in deep charcoal.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "silk-shirt",
    name: "Onyx Silk Shirt",
    price: 259,
    category: "Tops",
    image: shirt,
    description:
      "Pure silk camp-collar shirt in deep onyx. Mother-of-pearl buttons, relaxed fit.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "leather-tote",
    name: "Capsule Leather Tote",
    price: 549,
    category: "Accessories",
    image: bag,
    description:
      "Smooth Italian calfskin tote with reinforced handles and a structured silhouette. Suede-lined interior.",
    sizes: ["One Size"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
