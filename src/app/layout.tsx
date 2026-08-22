import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalHeader, ConditionalFooter } from "@/components/layout/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aventiq | Premium Software Development Company",
  description: "Aventiq is a modern software development company that helps businesses transform ideas into scalable websites, SaaS products, mobile applications, AI solutions, and custom software.",
  keywords: "Software Development, Web Development, SaaS Development, Mobile App Development, AI Development, Custom Software",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aventiq.com",
    title: "Aventiq | Premium Software Development Company",
    description: "Aventiq is a modern software development company that helps businesses transform ideas into scalable digital products and technology solutions.",
    siteName: "Aventiq",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground`} suppressHydrationWarning>
        <ConditionalHeader />
        <main className="flex-1 w-full pt-0">{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
