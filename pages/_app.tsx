import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter as FontSans } from "next/font/google"
import { Merriweather as FontSerif } from "next/font/google"
import { Silkscreen as FontMono } from "next/font/google"

import "@/styles/globals.css"
import { siteConfig } from "@/config/site"
import { absoluteUrl, cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"

import { ThemeProvider } from 'next-themes'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
})

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
})

const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-silkscreen",
  display: "swap",
})


export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "ben everman",
    "beneverman",
    "beneverman.com",
    "blog"
  ],
  authors: [
    {
      name: "ben everman",
      url: "https://beneverman.com",
    },
  ],
  creator: "ben everman",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/og.jpg"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@beneverman",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}


export default function App({ Component, pageProps }: AppProps) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <main className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
          fontMono.variable,
        )}>
          <Component {...pageProps} />
        </main>
        <Toaster />
      </ThemeProvider>
    </SessionContextProvider>
  )
}
