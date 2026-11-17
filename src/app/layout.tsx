import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Italiana } from "next/font/google";
import "./globals.css";
import { SITE_CONTENT } from "@/content/site";
import { AtelierContentProvider } from "@/context/AtelierContentContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italiana",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1B1220",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: SITE_CONTENT.seo.siteTitle,
  description: SITE_CONTENT.seo.siteDescription,
  keywords: SITE_CONTENT.seo.siteKeywords,
  authors: [{ name: SITE_CONTENT.brand.owner, url: SITE_CONTENT.brand.instagramUrl }],
  creator: SITE_CONTENT.brand.owner,
  publisher: SITE_CONTENT.brand.name,
  metadataBase: new URL("https://thepetalmuse.com"),
  openGraph: {
    title: SITE_CONTENT.seo.siteTitle,
    description: SITE_CONTENT.seo.siteDescription,
    url: "https://thepetalmuse.com",
    siteName: SITE_CONTENT.brand.name,
    images: [
      {
        url: SITE_CONTENT.seo.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONTENT.brand.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONTENT.seo.siteTitle,
    description: SITE_CONTENT.seo.siteDescription,
    images: [SITE_CONTENT.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: SITE_CONTENT.brand.name,
    image: SITE_CONTENT.seo.ogImage,
    description: SITE_CONTENT.seo.siteDescription,
    url: "https://thepetalmuse.com",
    telephone: SITE_CONTENT.brand.whatsappNumber,
    founder: {
      "@type": "Person",
      name: SITE_CONTENT.brand.owner,
      jobTitle: SITE_CONTENT.brand.role,
    },
    sameAs: [SITE_CONTENT.brand.instagramUrl],
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${italiana.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="font-sans antialiased bg-butter-cream text-ink-aubergine min-h-screen relative"
        suppressHydrationWarning
      >
        <AtelierContentProvider>
          {children}
        </AtelierContentProvider>
      </body>
    </html>
  );
}

