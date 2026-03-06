import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crop Disease Identifier",
  description: "Identify Crop Diseases Without Internet. SOTA offline AI diagnosis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col bg-dot-pattern`} suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 flex flex-col relative z-10 w-full max-w-[1400px] mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
