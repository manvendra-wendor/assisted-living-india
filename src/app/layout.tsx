import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { CompareProvider } from "@/components/compare-provider";
import { PricingModalProvider } from "@/components/pricing-modal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { editorialImages, siteConfig } from "@/lib/data";
import "./globals.css";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Assisted Living India | Compare Premium Senior Care", template: "%s | Assisted Living India" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  verification: { google: "To05qShSxs0zpFN-JjH1rGfSvsWReil4zmBYBCyvwKE" },
  openGraph: { type: "website", locale: "en_IN", siteName: siteConfig.name, title: siteConfig.name, description: siteConfig.description, images: [{ url: editorialImages.hero, alt: "An Indian family discussing senior living together" }] },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: [editorialImages.hero] },
};

export const viewport: Viewport = { themeColor: "#173f35", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={sans.variable}>
      <body>
        <CompareProvider>
          <PricingModalProvider>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </PricingModalProvider>
        </CompareProvider>
      </body>
    </html>
  );
}
