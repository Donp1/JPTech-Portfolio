import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JPTECH — Full-Stack Web & Mobile Developer",
  description:
    "Joseph Chukwuka Precious builds refined web applications and mobile products with React, React Native, Next.js and the JavaScript ecosystem.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "JPTECH — Building what's next for web & mobile",
    description:
      "Full-stack web and mobile development by Joseph Chukwuka Precious.",
    url: "/",
    siteName: "JPTECH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JPTECH — Full-Stack Web & Mobile Developer",
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
