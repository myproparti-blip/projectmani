import type React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import { FloatingActionButton } from '@/components/floating-action-button'
import { JsonLd } from '@/components/json-ld'
import { getOrganizationSchema } from '@/lib/seo-metadata'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  weight: ['400', '600', '700'], // Load only required weights
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://mahimarchitect.com"),
  title: {
    template: "%s | Mahim Architects by Ashish Patel - Interior Designer & Architect in Surat, Gujarat",
    default: "Best Interior Designer in Surat & Gujarat | 2BHK & 3BHK Home Interior Experts | Mahim Architects",
  },
  description:
    "Top Interior Designer & Architect in Surat and Gujarat offering 2BHK, 3BHK home interior, modular kitchen, luxury and affordable interior design and architectural services. Led by Ashish Patel with 15+ years experience.",
  keywords: [
    "interior designer in Surat",
    "interior designer in Gujarat",
    "best interior designer Surat",
    "best interior designer Gujarat",
    "interior design company Surat",
    "interior design company Gujarat",
    "architect in Surat",
    "architect in Gujarat",
    "architecture firm Surat",
    "architecture firm Gujarat",
    "2BHK interior design Surat",
    "3BHK interior design Surat",
    "2BHK interior design Gujarat",
    "3BHK interior design Gujarat",
    "modular kitchen designer Surat",
    "modular kitchen designer Gujarat",
    "luxury interior designer Surat",
    "luxury interior designer Gujarat",
    "affordable interior designer Surat",
    "affordable interior designer Gujarat",
    "interior designer near me Surat",
    "interior designer near me Gujarat",
    "residential architect Surat",
    "residential architect Gujarat",
    "commercial architect Surat",
    "commercial architect Gujarat",
    "home interior designer Surat",
    "home interior designer Gujarat",
    "apartment interior design Surat",
    "apartment interior design Gujarat",
    "villa interior design Surat",
    "villa interior design Gujarat",
    "office interior design Surat",
    "office interior design Gujarat",
    "retail interior design Surat",
    "retail interior design Gujarat",
    "Ashish Patel architect Surat",
    "Ashish Patel interior designer Gujarat",
    "Mahim Architects Surat",
    "Mahim Architects Gujarat",
    "home design Surat",
    "home design Gujarat",
    "architectural design Surat",
    "architectural design Gujarat",
    "interior styling Surat",
    "interior styling Gujarat",
    "space planning Surat",
    "space planning Gujarat",
    "furniture design Surat",
    "furniture design Gujarat",
    "Ashish Patel architect",
    "Ashish Patel designer",
    "Mahim Architects",
    "Mahim Architects reviews",
    "Mahim Architects portfolio",
    "best architect Surat",
    "best architect Gujarat",
    "top architect Surat",
    "top architect Gujarat",
    "experienced architect Surat",
    "experienced architect Gujarat",
    "affordable architect Surat",
    "affordable architect Gujarat",
    "luxury architect Surat",
    "luxury architect Gujarat",
    "residential design Surat",
    "residential design Gujarat",
    "commercial design Surat",
    "commercial design Gujarat",
    "interior renovation Surat",
    "interior renovation Gujarat",
    "home renovation Surat",
    "home renovation Gujarat",
    "kitchen design Surat",
    "kitchen design Gujarat",
    "bedroom design Surat",
    "bedroom design Gujarat",
    "living room design Surat",
    "living room design Gujarat",
    "3D interior design Surat",
    "3D interior design Gujarat",
    "interior consultant Surat",
    "interior consultant Gujarat",
    "design consultation Surat",
    "design consultation Gujarat",
    "architect and interior designer Surat",
    "architect and interior designer Gujarat",
    "architect interior design Surat",
    "architect interior design Gujarat",
    "architecture and interior design Surat",
    "architecture and interior design Gujarat",
    "residential architect and designer Surat",
    "residential architect and designer Gujarat",
    "commercial architect and designer Surat",
    "commercial architect and designer Gujarat",
    "full design services Surat",
    "full design services Gujarat",
    "complete home design Surat",
    "complete home design Gujarat",
    "design build architect Surat",
    "design build architect Gujarat",
    "construction architect Surat",
    "construction architect Gujarat",
    "architectural services Surat",
    "architectural services Gujarat",
    "interior design services Surat",
    "interior design services Gujarat",
    "design consultant Surat",
    "design consultant Gujarat",
    "property designer Surat",
    "property designer Gujarat",
    "home designer Surat",
    "home designer Gujarat",
    "building architect Surat",
    "building architect Gujarat",
    "space designer Surat",
    "space designer Gujarat",
    "facade design Surat",
    "facade design Gujarat",
    "landscape architect Surat",
    "landscape architect Gujarat",
    "top 10 architects in Surat",
    "top 10 architects in Gujarat",
    "top architects Surat",
    "top architects Gujarat",
    "best 10 architects Surat",
    "best 10 architects Gujarat",
    "leading architects Surat",
    "leading architects Gujarat",
    "top 10 interior designers in Surat",
    "top 10 interior designers in Gujarat",
    "top interior designers Surat",
    "top interior designers Gujarat",
    "best 10 interior designers Surat",
    "best 10 interior designers Gujarat",
    "leading interior designers Surat",
    "leading interior designers Gujarat",
    "top 10 interior design companies Surat",
    "top 10 interior design companies Gujarat",
    "best interior design studios Surat",
    "best interior design studios Gujarat",
    "famous architects Surat",
    "famous architects Gujarat",
    "famous interior designers Surat",
    "famous interior designers Gujarat",
    "award winning architects Surat",
    "award winning architects Gujarat",
    "award winning interior designers Surat",
    "award winning interior designers Gujarat",
    "renowned architects Surat",
    "renowned architects Gujarat",
    "renowned interior designers Surat",
    "renowned interior designers Gujarat",
    "professional architects Surat",
    "professional architects Gujarat",
    "professional interior designers Surat",
    "professional interior designers Gujarat",
    "experienced architects Surat",
    "experienced architects Gujarat",
    "experienced interior designers Surat",
    "experienced interior designers Gujarat",
  ],
  generator: "Next.js",
  verification: {
    google: "NdpqGNyZe2LJXw5qeWCc5unMjsGWS9zrIeRQl0T_UDY",
  },
  alternates: {
    canonical: "https://mahimarchitect.com/",
  },
  openGraph: {
    siteName: "Mahim Architects - Interior Designer & Architect",
    title: "Best Interior Designer in Surat & Gujarat | Home Interior Experts | Mahim Architects by Ashish Patel",
    description:
      "Top Interior Designer in Surat and Gujarat. 2BHK, 3BHK home interior design, modular kitchen, luxury & affordable services. Led by Ashish Patel (15+ years).",
    type: "website",
    url: "https://mahimarchitect.com/",
    images: [
      {
        url: "https://mahimarchitect.com/og-image.jpg",
        alt: "Mahim Architects - Best Interior Designer in Surat & Gujarat",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Interior Designer in Surat & Gujarat | Mahim Architects",
    description:
      "Top Interior Designer offering 2BHK, 3BHK home interior, modular kitchen design in Surat and Gujarat. Led by Ashish Patel.",
    images: ["https://mahimarchitect.com/og-image.jpg"],
    creator: "@mahimarchitects",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    interactiveWidget: "resizes-content",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} antialiased`}>
      <head>
        {/* JSON-LD Organization Schema */}
        <JsonLd data={getOrganizationSchema()} />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="NdpqGNyZe2LJXw5qeWCc5unMjsGWS9zrIeRQl0T_UDY" />

        {/* Additional Meta Tags */}
        <meta name="application-name" content="Mahim Architects" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mahim Architects" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Preconnect for fonts - Critical for LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for third-party services */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Resource hints for external assets */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" as="style" />
      </head>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Architect",
              name: "Mahim Architect",
              url: "https://mahimarchitect.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Surat",
                addressRegion: "Gujarat",
                addressCountry: "India",
              },
            }),
          }}
        />
        {children}
        <FloatingActionButton />

        {/* Google Analytics - Loaded after user interaction for optimal performance */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TBCDEF9XYZ"
          strategy="afterInteractive"
          async
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TBCDEF9XYZ', {
                page_path: window.location.pathname,
                anonymize_ip: true,
              });
            `,
          }}
        />

        {/* Vercel Analytics - Deferred for minimal impact */}
        <Script
          src="https://cdn.vercel-insights.com/v1/script.js"
          strategy="lazyOnload"
          async
        />
      </body>
    </html>
  )
}
