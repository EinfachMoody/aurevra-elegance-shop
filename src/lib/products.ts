import hoodie from "@/assets/product-hoodie-black.jpg";
import tee from "@/assets/product-tee-cream.jpg";
import jacket from "@/assets/product-jacket-black.jpg";
import pants from "@/assets/product-pants-black.jpg";
import coat from "@/assets/product-coat-beige.jpg";
import knit from "@/assets/product-knit-grey.jpg";
import shirt from "@/assets/product-shirt-silk.jpg";
import bag from "@/assets/product-bag-leather.jpg";

import tshirtBlackOversized from "@/assets/product-tshirt-black-oversized.jpg";
import tshirtCreamBoxy from "@/assets/product-tshirt-cream-boxy.jpg";
import tshirtTaupe from "@/assets/product-tshirt-taupe.jpg";
import hoodieCharcoal from "@/assets/product-hoodie-charcoal.jpg";
import hoodieBoneZip from "@/assets/product-hoodie-bone-zip.jpg";
import coatCamelLong from "@/assets/product-coat-camel-long.jpg";
import jacketNylonBlack from "@/assets/product-jacket-nylon-black.jpg";
import pantsCreamWide from "@/assets/product-pants-cream-wide.jpg";
import pantsChocolateSlim from "@/assets/product-pants-chocolate-slim.jpg";
import capBlack from "@/assets/product-cap-black.jpg";
import bagCognacPouch from "@/assets/product-bag-cognac-pouch.jpg";
import scarfOatmeal from "@/assets/product-scarf-oatmeal.jpg";

import type { CollectionId } from "./collections";

export type Category = "Outerwear" | "Oberteile" | "Hosen" | "Accessoires" | "T-Shirts" | "Hoodies";
export type Fit = "Oversized" | "Slim" | "Relaxed" | "Tailored" | "Boxy";
/** Welches der 3 Brand-Marks ist auf dem Piece appliziert */
export type LogoApplication = "monogram" | "wordmark" | "lockup" | "none";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  sizes: string[];
  badge?: string;
  fit?: Fit;
  material?: string;
  collection?: CollectionId;
  logo?: LogoApplication;
  /** Bestseller-Marker (für Homepage-Sektion) */
  bestseller?: boolean;
  /** Neue Drop-Marker (für Homepage-Sektion) */
  isNew?: boolean;
};

export const products: Product[] = [
  // ============= NOIR ESSENCE =============
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
    fit: "Tailored",
    material: "Technischer Satin",
    collection: "noir-essence",
    logo: "monogram",
    isNew: true,
  },
  {
    id: "essential-hoodie",
    name: "Essential Hoodie",
    price: 189,
    category: "Hoodies",
    image: hoodie,
    badge: "Bestseller",
    description:
      "Geschnitten aus schwerem, gebürstetem Baumwoll-Fleece mit entspannter Silhouette. Der Essential Hoodie ist die Basis der AUREVRA-Garderobe — ruhig, durchdacht, gemacht, um Saisons zu überdauern.",
    sizes: ["S", "M", "L", "XL"],
    fit: "Relaxed",
    material: "Bio-Baumwoll-Fleece 480 g/m²",
    collection: "noir-essence",
    logo: "monogram",
    bestseller: true,
  },
  {
    id: "noir-tshirt-oversized",
    name: "Noir Heavyweight Tee",
    price: 119,
    category: "T-Shirts",
    image: tshirtBlackOversized,
    description:
      "Heavyweight Tee in tiefem Onyx aus 320g Bio-Baumwolle. Oversized Schnitt, gerippter Kragen, Monogramm dezent appliziert.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fit: "Oversized",
    material: "Bio-Baumwolle 320 g/m²",
    collection: "noir-essence",
    logo: "monogram",
    bestseller: true,
  },
  {
    id: "noir-hoodie-charcoal",
    name: "Charbon Hoodie",
    price: 229,
    category: "Hoodies",
    image: hoodieCharcoal,
    badge: "Neu",
    description:
      "Schwerer Anthrazit-Hoodie mit gefütterter Kapuze und gepressten Kordeln. Monogramm dezent in Schwarz auf Schwarz.",
    sizes: ["S", "M", "L", "XL"],
    fit: "Oversized",
    material: "Premium Cotton Blend 520 g/m²",
    collection: "noir-essence",
    logo: "monogram",
    isNew: true,
  },
  {
    id: "noir-jacket-nylon",
    name: "Onyx Cropped Nylon",
    price: 389,
    category: "Outerwear",
    image: jacketNylonBlack,
    description:
      "Cropped Bomberjacke aus technischem Nylon. Mattschwarze Beschläge, leichter Fall, scharf konstruierter Stehkragen.",
    sizes: ["S", "M", "L"],
    fit: "Tailored",
    material: "Technisches Nylon",
    collection: "noir-essence",
    logo: "monogram",
    isNew: true,
  },
  {
    id: "noir-pants-chocolate",
    name: "Cacao Tailored Trouser",
    price: 239,
    category: "Hosen",
    image: pantsChocolateSlim,
    description:
      "Slim getailorte Hose aus tief schokoladenbrauner Wolle. Pressfalte, hoher Bund, fließender Fall.",
    sizes: ["S", "M", "L", "XL"],
    fit: "Slim",
    material: "Italienische Wolle",
    collection: "noir-essence",
    logo: "none",
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
    fit: "Relaxed",
    material: "Wollmix",
    collection: "noir-essence",
    logo: "none",
  },
  {
    id: "noir-cap",
    name: "Monogramme Cap",
    price: 89,
    category: "Accessoires",
    image: capBlack,
    badge: "Neu",
    description:
      "Unstrukturierter 6-Panel Cap aus gewaschener Baumwolle. Gesticktes Monogramm in Ton-in-Ton.",
    sizes: ["One Size"],
    material: "Gewaschene Baumwolle",
    collection: "noir-essence",
    logo: "monogram",
    isNew: true,
    bestseller: true,
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
    fit: "Relaxed",
    material: "100% Seide",
    collection: "noir-essence",
    logo: "none",
  },

  // ============= VÉRITÉ PRINTEMPS =============
  {
    id: "verite-tee-cream",
    name: "Vérité Boxy Tee",
    price: 109,
    category: "T-Shirts",
    image: tshirtCreamBoxy,
    badge: "Neu",
    description:
      "Boxy geschnittenes Tee aus japanischer Bio-Baumwolle in Elfenbein. Fließend, gewichtslos, mit dem Wordmark im Nacken.",
    sizes: ["XS", "S", "M", "L"],
    fit: "Boxy",
    material: "Japanische Bio-Baumwolle",
    collection: "verite-printemps",
    logo: "wordmark",
    isNew: true,
  },
  {
    id: "atelier-tee",
    name: "Atelier Cotton Tee",
    price: 89,
    category: "T-Shirts",
    image: tee,
    description:
      "Ein veredeltes Essential aus kompakter Bio-Baumwolle, kleidungsgefärbt für einen subtilen Off-White-Ton. Maßgeschneiderte Schultern, klare Halslinie.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fit: "Slim",
    material: "Bio-Baumwolle",
    collection: "verite-printemps",
    logo: "wordmark",
    bestseller: true,
  },
  {
    id: "verite-hoodie-bone",
    name: "Bone Zip Hoodie",
    price: 249,
    category: "Hoodies",
    image: hoodieBoneZip,
    description:
      "Zip-Up Hoodie in Bone-Weiß aus garment-dyed Premium-Fleece. Silberne Beschläge, klare Linien.",
    sizes: ["S", "M", "L", "XL"],
    fit: "Relaxed",
    material: "Premium Fleece 480 g/m²",
    collection: "verite-printemps",
    logo: "wordmark",
    isNew: true,
  },
  {
    id: "verite-pants-cream",
    name: "Lumière Wide Trouser",
    price: 269,
    category: "Hosen",
    image: pantsCreamWide,
    description:
      "Wide-Leg Hose aus fließender Cremewolle mit gepresster Falte. Hoher Bund, bodenlange Länge.",
    sizes: ["XS", "S", "M", "L"],
    fit: "Relaxed",
    material: "Wollmix",
    collection: "verite-printemps",
    logo: "none",
    isNew: true,
  },

  // ============= ÉLAN AUTOMNE =============
  {
    id: "camel-coat",
    name: "Maison Long Coat",
    price: 729,
    category: "Outerwear",
    image: coat,
    badge: "Bestseller",
    description:
      "Ein doppelseitiger Wollmantel in warmem Camel. Minimaler Revers, einreihiger Verschluss, bodenlange Länge.",
    sizes: ["S", "M", "L", "XL"],
    fit: "Tailored",
    material: "Wolle / Kaschmir",
    collection: "elan-automne",
    logo: "lockup",
    bestseller: true,
  },
  {
    id: "elan-coat-camel",
    name: "Élan Atelier Coat",
    price: 889,
    category: "Outerwear",
    image: coatCamelLong,
    badge: "Limitiert",
    description:
      "Doppelreihiger Long Coat aus reiner italienischer Schurwolle in tiefem Camel. Atelier-gefertigt, nummeriert, mit gesticktem Lockup im Innenfutter.",
    sizes: ["S", "M", "L"],
    fit: "Tailored",
    material: "100% Italienische Schurwolle",
    collection: "elan-automne",
    logo: "lockup",
    isNew: true,
    bestseller: true,
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
    fit: "Slim",
    material: "100% Merinowolle",
    collection: "elan-automne",
    logo: "none",
    bestseller: true,
  },
  {
    id: "elan-tee-taupe",
    name: "Bronze Heritage Tee",
    price: 99,
    category: "T-Shirts",
    image: tshirtTaupe,
    description:
      "Garment-dyed Tee in warmem Taupe-Rosé. Relaxed Fit, Wordmark in Bronze auf Brust.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fit: "Relaxed",
    material: "Bio-Baumwolle, garment-dyed",
    collection: "elan-automne",
    logo: "wordmark",
    isNew: true,
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
    material: "Italienisches Kalbsleder",
    collection: "elan-automne",
    logo: "lockup",
    bestseller: true,
  },
  {
    id: "elan-bag-cognac",
    name: "Cognac Mini Pouch",
    price: 329,
    category: "Accessoires",
    image: bagCognacPouch,
    badge: "Neu",
    description:
      "Kompakter Crossbody-Pouch aus glattem Cognac-Kalbsleder. Goldfarbene Beschläge, geprägtes Lockup.",
    sizes: ["One Size"],
    material: "Italienisches Kalbsleder",
    collection: "elan-automne",
    logo: "lockup",
    isNew: true,
  },
  {
    id: "elan-scarf-oatmeal",
    name: "Oatmeal Cashmere Scarf",
    price: 219,
    category: "Accessoires",
    image: scarfOatmeal,
    description:
      "Lang gerippter Schal aus reinem Kaschmir in Oatmeal. Handgerollte Säume, Wordmark dezent gestickt.",
    sizes: ["One Size"],
    material: "100% Kaschmir",
    collection: "elan-automne",
    logo: "wordmark",
    bestseller: true,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const getProductsByCollection = (collectionId: CollectionId) =>
  products.filter((p) => p.collection === collectionId);

export const getBestsellers = () => products.filter((p) => p.bestseller);
export const getNewDrops = () => products.filter((p) => p.isNew);
