import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Ensure siteUrl is defined elsewhere (e.g., const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jptech.dev')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JPTECH — Full-Stack Web & Mobile Developer",
    template: "%s | JPTECH",
  },
  description:
    "Joseph Chukwuka Precious builds high-performance web applications and mobile products with React, Next.js, and React Native.",
  keywords: [
    "Full-Stack Developer",
    "Web Developer",
    "Mobile Developer",
    "React Native Expert",
    "Next.js Developer",
    "JavaScript",
    "TypeScript",
    "Joseph Chukwuka Precious",
    "JPTECH",
  ],
  authors: [{ name: "Joseph Chukwuka Precious" }],
  creator: "Joseph Chukwuka Precious",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JPTECH — Building What's Next for Web & Mobile",
    description:
      "High-performance web and mobile apps engineered by Joseph Chukwuka Precious using React, Next.js, and React Native.",
    url: "/",
    siteName: "JPTECH",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "JPTECH — Web and mobile development by Joseph Chukwuka Precious",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPTECH — Full-Stack Web & Mobile Developer",
    description:
      "Joseph Chukwuka Precious builds refined web applications and mobile products.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
