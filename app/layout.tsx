import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter-family" });
const tfl = localFont({
  variable: "--font-board-family",
  src: [
    {
      path: "../assets/fonts/LondonUndergroundRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/LondonUndergroundMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/LondonUndergroundBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/LondonUndergroundHeavy.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "TFL Boards",
  description: "The TFL Departure Boards online",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans dark">
      <body
        className={`${inter.variable} ${tfl.variable} ${inter.className} relative z-10 flex h-[100dvh] max-h-[100dvh] max-w-[100dvw] flex-col overflow-y-auto bg-black px-2`}
      >
        <QueryProvider>
          <div
            className="absolute inset-0 z-[-1] h-full w-full"
          >
            <Image
              src="/background.png"
              priority
              fill
              alt="Picture of a london underground platform"
              style={{ opacity: 0.2, zIndex: -1, objectFit: "cover" }}
            />
          </div>
          {children}
          <footer className="w-full text-center">
            Built by{" "}
            <Link href="https://jamesshopland.com" className="underline">
              James Shopland
            </Link>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
