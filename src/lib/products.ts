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
  category: "Outerwear" | "Oberteile" | "Hosen" | "Accessoires";
  image: string;
  description: string;
  sizes: string[];
  badge?: string;
};

export const products: Product[] = [
  {
    id: "essential-hoodie",
    name: "Essential Hoodie",
    price: 189,
    category: "Oberteile",
    image: hoodie,
    badge: "Bestseller",
    description:
      "Geschnitten aus schwerem, gebürstetem Baumwoll-Fleece mit entspannter Silhouette. Der Essential Hoodie ist die Basis der AUREVRA-Garderobe — ruhig, durchdacht, gemacht, um Saisons zu überdauern.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "atelier-tee",
    name: "Atelier Cotton Tee",
    price: 89,
    category: "Oberteile",
    image: tee,
    description:
      "Ein veredeltes Essential aus kompakter Bio-Baumwolle, kleidungsgefärbt für einen subtilen Off-White-Ton. Maßgeschneiderte Schultern, klare Halslinie.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "noir-bomber",
    name: "Noir Bomberjacke",
    price: 449,
    category: "Outerwear",
    image: jacket,
    badge: "Neu",
    description:
      "Eine moderne Bomberjacke aus technischem Satin mit skulpturalem Kragen und mattem Beschlag. Konstruierter Fall, kinematisches Finish.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "wide-trouser",
    name: "Studio Wide-Leg Hose",
    price: 219,
    category: "Hosen",
    image: pants,
    description:
      "Hochgeschnittene Wollmix-Hose mit fließendem, weitem Bein und gepresster Bügelfalte. Geschneidert in Portugal.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "camel-coat",
    name: "Maison Long Coat",
    price: 729,
    category: "Outerwear",
    image: coat,
    description:
      "Ein doppelseitiger Wollmantel in warmem Camel. Minimaler Revers, einreihiger Verschluss, bodenlange Länge.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "merino-knit",
    name: "Merino Crew Strick",
    price: 169,
    category: "Oberteile",
    image: knit,
    description:
      "Feinstrick aus reiner Merinowolle mit edlem Rippkragen. Soft-Touch-Finish in tiefem Anthrazit.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "silk-shirt",
    name: "Onyx Silk Shirt",
    price: 259,
    category: "Oberteile",
    image: shirt,
    description:
      "Reines Seidenhemd mit Camp Collar in tiefem Onyx. Perlmuttknöpfe, entspannter Schnitt.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "leather-tote",
    name: "Capsule Leder-Tote",
    price: 549,
    category: "Accessoires",
    image: bag,
    badge: "Limitiert",
    description:
      "Glatter italienischer Kalbsleder-Tote mit verstärkten Henkeln und strukturierter Silhouette. Wildleder-gefüttertes Innenleben.",
    sizes: ["One Size"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
