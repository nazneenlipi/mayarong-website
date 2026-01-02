import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/app/providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

// metadata থেকে viewport ডিলিট করে দিন
export const metadata: Metadata = {
  title: "MAYA RANG - Premium Watches & Bags | Luxury Fashion Collection",
  description: "Discover MAYA RANG's exclusive collection of premium watches and bags.",
  keywords: "watches, bags, luxury fashion, premium accessories",
  authors: [{ name: "MAYA RANG" }],
  openGraph: {
    title: "MAYA RANG - Premium Watches & Bags",
    description: "Discover our exclusive collection of premium watches and bags",
    type: "website",
  },
  robots: "index, follow",
  generator: 'v0.app',
  metadataBase: new URL("https://mayarang.com")
}

// আলাদা করে viewport এক্সপোর্ট করুন
export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://mayarang.com" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
