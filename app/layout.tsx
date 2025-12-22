import type { Metadata } from "next"
import localFont from "next/font/local"

import "./globals.css"

const instrumentSans = localFont({
  variable: "--font-instrument-sans",
  src: [
    {
      path: "../public/fonts/instrument-sans/InstrumentSans[wdth,wght].woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "../public/fonts/instrument-sans/InstrumentSans-Italic[wdth,wght].woff2",
      weight: "400 700",
      style: "italic",
    },
  ],
})

const jetBrainsMono = localFont({
  variable: "--font-jetbrains-mono",
  src: [
    {
      path: "../public/fonts/jetbrains-mono/JetBrainsMono[wght].woff2",
      weight: "100 800",
      style: "normal",
    },
    {
      path: "../public/fonts/jetbrains-mono/JetBrainsMono-Italic[wght].woff2",
      weight: "100 800",
      style: "italic",
    },
  ],
})

export const metadata: Metadata = {
  title: "tedem — Developer",
  description:
    "Personal website of tedem, a software developer specializing in web development and open source.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className={`${instrumentSans.variable} ${jetBrainsMono.variable}`}
      lang="en"
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
