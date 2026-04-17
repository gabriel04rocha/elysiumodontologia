import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elysium Odontologia | Lentes e Facetas Dentárias",
  description:
    "Transforme seu sorriso com as melhores lentes e facetas dentárias. A Elysium Odontologia oferece tratamentos de alta estética com tecnologia de ponta e atendimento exclusivo.",
  keywords: ["lentes dentárias", "facetas dentárias", "odontologia estética", "Elysium Odontologia", "sorriso perfeito", "Goiânia"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Elysium Odontologia | Lentes e Facetas Dentárias",
    description: "Transforme seu sorriso com as melhores lentes e facetas dentárias.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
