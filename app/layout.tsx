import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYVA SKIN — Your skin. Your ritual.",
  description: "Explore all 20 NYVA SKIN products, including cleansers, essence, serums, moisturisers, treatments, a mask, facial oil and SPF 50+.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
