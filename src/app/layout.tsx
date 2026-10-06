import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieConsent from "@/components/CookieConsent";
import TawkChat from "@/components/TawkChat";
import JsonLd from "@/components/JsonLd";
import { site } from "@/config/site";

// Fontes hospedadas no próprio site (mais rápido e sem depender do Google Fonts)

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Gestão de Riscos Psicossociais e NR-1`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["riscos psicossociais", "NR-1", "PGR saúde mental", "consultoria saúde mental corporativa", "burnout", "turnover", "absenteísmo", "ISO 45003", "São Paulo"],
  openGraph: { type: "website", locale: "pt_BR", siteName: site.name, url: "/" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } : undefined,
};

export const viewport: Viewport = { themeColor: "#0B2733", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const a = site.contact.address;
  return (
    <html lang="pt-BR">
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${site.url}/#empresa`,
            name: site.name,
            legalName: site.legalName,
            description: site.description,
            url: site.url,
            logo: `${site.url}/icon.svg`,
            image: `${site.url}/opengraph-image`,
            email: site.contact.email,
            telephone: `+${site.contact.whatsapp}`,
            address: { "@type": "PostalAddress", ...(a.street ? { streetAddress: a.street } : {}), addressLocality: a.city, addressRegion: a.state, ...(a.zip ? { postalCode: a.zip } : {}), addressCountry: a.country },
            areaServed: { "@type": "Country", name: "Brasil" },
            sameAs: Object.values(site.social),
            knowsAbout: ["Riscos psicossociais", "NR-1", "PGR", "ISO 45003", "Burnout", "Saúde mental corporativa", "Liderança"],
          }}
        />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CookieConsent />
        <TawkChat />
      </body>
    </html>
  );
}
