import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShopProvider } from "@/lib/store";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="serif text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-sm uppercase tracking-wider-luxe text-muted-foreground">Seite nicht gefunden</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Die gesuchte Seite wurde verschoben oder existiert nicht mehr.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-[12px] uppercase tracking-wider-luxe text-background transition hover:bg-foreground/85"
          >
            Zurück zu AUREVRA
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AUREVRA — Defined by Elegance" },
      {
        name: "description",
        content:
          "AUREVRA. Ein modernes Maison, definiert durch Identität, Anspruch und zeitloses Design. Entdecke die Kollektion.",
      },
      { property: "og:title", content: "AUREVRA — Defined by Elegance" },
      {
        property: "og:description",
        content: "Ein modernes Maison. Entdecke Ready-to-wear, Outerwear und Accessoires.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ShopProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ShopProvider>
  );
}
