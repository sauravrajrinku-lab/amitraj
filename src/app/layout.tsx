import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amit Raj | M.Tech Electric Mobility | IIT Delhi '28",
  description:
    "Portfolio of Amit Raj — M.Tech Electric Mobility student at IIT Delhi, GATE 2026 Qualified (EE & IN). Specializing in Power Systems, EV Powertrains, and Smart Grids.",
  keywords: [
    "Amit Raj",
    "IIT Delhi",
    "M.Tech Electric Mobility",
    "GATE 2026",
    "Electrical Engineering",
    "Power Systems",
    "SBPDCL Internship",
    "Bhagalpur College of Engineering",
  ],
  authors: [{ name: "Amit Raj" }],
  openGraph: {
    title: "Amit Raj — M.Tech Electric Mobility | IIT Delhi",
    description:
      "Electrical Engineer specializing in Electric Mobility, Power System Protection, and EV Powertrains at IIT Delhi.",
    type: "website",
    locale: "en_US",
  },
};

import TechGridBackground from "@/components/TechGridBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} bg-[#0D0D0D] text-ds-text1 antialiased selection:bg-ds-accent/30 selection:text-ds-accent relative`}
      >
        <TechGridBackground />
        <div className="relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}
