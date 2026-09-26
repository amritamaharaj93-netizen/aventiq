const fs = require('fs');
let content = fs.readFileSync('src/app/layout.tsx', 'utf8');

const newMetadata = `export const metadata: Metadata = {
  metadataBase: new URL('https://aventiq.com'),
  title: "Aventiq Web Solutions | Web Development & Digital Marketing",
  description: "Aventiq Web Solutions is a premium IT company providing cutting-edge website development, digital marketing, SaaS engineering, and UI/UX design services to help businesses grow.",
  keywords: "Web Development, Digital Marketing, SaaS Engineering, UI/UX Design, IT Company, Aventiq, Software Agency",
  authors: [{ name: "Aventiq Web Solutions" }],
  publisher: "Aventiq Web Solutions",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aventiq.com",
    title: "Aventiq Web Solutions | Web Development & Digital Marketing",
    description: "Aventiq Web Solutions is a premium IT company providing cutting-edge website development and digital marketing.",
    siteName: "Aventiq Web Solutions",
  },
};`;

content = content.replace(/export const metadata: Metadata = \{[\s\S]*?\};/, newMetadata);

fs.writeFileSync('src/app/layout.tsx', content);
