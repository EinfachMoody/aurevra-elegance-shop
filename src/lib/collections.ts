import noirHero from "@/assets/collection-noir-hero.jpg";
import veriteHero from "@/assets/collection-verite-hero.jpg";
import elanHero from "@/assets/collection-elan-hero.jpg";

export type CollectionId = "noir-essence" | "verite-printemps" | "elan-automne";

export type Collection = {
  id: CollectionId;
  /** Pfad-Slug für Routing (/collection/$slug) */
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  hero: string;
  /** Akzent-Farbe als Tailwind-kompatibler Hex (für Badges, Akzentlinien) */
  accent: string;
  /** Hintergrundton der Kollektions-Landingpage */
  background: string;
  /** Welches der drei Logos passt zum Charakter dieser Kollektion */
  logoVariant: "monogram" | "wordmark" | "lockup";
};

export const collections: Collection[] = [
  {
    id: "noir-essence",
    slug: "noir-essence",
    name: "Noir Essence",
    subtitle: "Capsule · Winter",
    tagline: "Die Stille der Nacht.",
    description:
      "Eine Studie in Schwarz. Skulpturale Silhouetten, schwere Stoffe und matte Beschläge — komponiert für die Architektur der Nacht. Jedes Piece dieser Kollektion ist eine Geste, kein Statement.",
    hero: noirHero,
    accent: "#0a0a0a",
    background: "oklch(0.14 0.005 80)",
    logoVariant: "monogram",
  },
  {
    id: "verite-printemps",
    slug: "verite-printemps",
    name: "VÉRITÉ Printemps",
    subtitle: "Capsule · Frühling",
    tagline: "Wahrheit in Leichtigkeit.",
    description:
      "Eine Hommage an die Stunde, in der das Licht zurückkehrt. Seide, Bio-Baumwolle und transparente Lagen in einer Palette aus Elfenbein, Rosé und Champagner. Stille, sanft erzählt.",
    hero: veriteHero,
    accent: "#d9c4b1",
    background: "oklch(0.97 0.012 70)",
    logoVariant: "wordmark",
  },
  {
    id: "elan-automne",
    slug: "elan-automne",
    name: "Élan Automne",
    subtitle: "Capsule · Herbst",
    tagline: "Wärme als Haltung.",
    description:
      "Camel, Rost, Bronze. Schwere Wolle, Kaschmir und gewachstes Leder vereinen sich zu einer Garderobe der goldenen Stunde. Pieces, die Erinnerungen weben.",
    hero: elanHero,
    accent: "#a06b3c",
    background: "oklch(0.96 0.018 75)",
    logoVariant: "lockup",
  },
];

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);
