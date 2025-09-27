import Providers from "@/components/providers";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "Todo App",
  description: "A todo app built with Next.js",
icons: {
  icon: [
    { url: "/favicon.ico" },
    { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  ],
  apple: "/apple-touch-icon.png",
}

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>{children}</Providers>
        <Toaster/>
      </body>
    </html>
  );
}


