import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spirit — An Agentic Marketplace for India's Artisans",
  description:
    "Every craft with its maker, its story and a fair price. Empowering India's craftspeople through 5 autonomous AI agents, Celine Khata, and verified provenance.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0F17] text-[#F3F4F6] antialiased selection:bg-[#E8A33D] selection:text-black">
        {children}
      </body>
    </html>
  );
}
