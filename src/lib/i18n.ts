import { formatPrice } from "@/lib/store";

export const tProducts: Record<string, { name: string; description: string; category: string }> = {
  "essential-hoodie": {
    name: "Essential Hoodie",
    category: "Oberteile",
    description:
      "Geschnitten aus schwerem, gebürstetem Baumwoll-Fleece mit entspannter Silhouette. Der Essential Hoodie ist die Basis der AUREVRA-Garderobe — ruhig, durchdacht, gemacht, um Saisons zu überdauern.",
  },
  "atelier-tee": {
    name: "Atelier Cotton Tee",
    category: "Oberteile",
    description:
      "Ein veredeltes Essential aus kompakter Bio-Baumwolle, kleidungsgefärbt für einen subtilen Off-White-Ton. Maßgeschneiderte Schultern, klare Halslinie.",
  },
  "noir-bomber": {
    name: "Noir Bomberjacke",
    category: "Outerwear",
    description:
      "Eine moderne Bomberjacke aus technischem Satin mit skulpturalem Kragen und mattem Beschlag. Konstruierter Fall, kinematisches Finish.",
  },
  "wide-trouser": {
    name: "Studio Wide-Leg Hose",
    category: "Hosen",
    description:
      "Hochgeschnittene Wollmix-Hose mit fließendem, weitem Bein und gepresster Bügelfalte. Geschneidert in Portugal.",
  },
  "camel-coat": {
    name: "Maison Long Coat",
    category: "Outerwear",
    description:
      "Ein doppelseitiger Wollmantel in warmem Camel. Minimaler Revers, einreihiger Verschluss, bodenlange Länge.",
  },
  "merino-knit": {
    name: "Merino Crew Strick",
    category: "Oberteile",
    description:
      "Feinstrick aus reiner Merinowolle mit edlem Rippkragen. Soft-Touch-Finish in tiefem Anthrazit.",
  },
  "silk-shirt": {
    name: "Onyx Silk Shirt",
    category: "Oberteile",
    description:
      "Reines Seidenhemd mit Camp Collar in tiefem Onyx. Perlmuttknöpfe, entspannter Schnitt.",
  },
  "leather-tote": {
    name: "Capsule Leder-Tote",
    category: "Accessoires",
    description:
      "Glatter italienischer Kalbsleder-Tote mit verstärkten Henkeln und strukturierter Silhouette. Wildleder-gefüttertes Innenleben.",
  },
};

export const categoryDE = (c: string) => {
  switch (c) {
    case "Outerwear": return "Outerwear";
    case "Tops": return "Oberteile";
    case "Bottoms": return "Hosen";
    case "Accessories": return "Accessoires";
    default: return c;
  }
};

export { formatPrice };
