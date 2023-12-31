import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import StoreProvider from "@/components/StoreProvider";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button-variants";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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

const tfl = localFont({
  variable: "--font-tfl",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans relative ">
      <StoreProvider>
        <body
          className={`${inter.variable} ${tfl.variable} ${inter.className} z-10 bg-black px-2 h-[100dvh] max-h-[100dvh] max-w-[100dvw] overflow-y-auto flex flex-col`}
        >
          <div
            className="absolute z-[-1] h-full inset-0 w-full"
            suppressHydrationWarning
          >
            <Image
              src="/background.png"
              priority
              fill
              alt="Picture of a london underground platform"
              style={{ opacity: "20%", zIndex: -1, objectFit: "cover" }}
              suppressHydrationWarning
            />
          </div>
          {children}
          <footer className="w-full text-center">
            Built by{" "}
            <Link href="https://jamesshopland.com" className="underline">
              James Shopland
            </Link>
          </footer>
        </body>
      </StoreProvider>
    </html>
  );
}
