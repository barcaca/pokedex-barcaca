import '@/styles/globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

import { Header } from '@/components/layout/header'
import { poppins, raleway } from '@/fonts/fonts'

import { Provider } from './providers'

/**
 * Metadata for the application
 */
export const metadata: Metadata = {
  title: 'Pokedex Barcaca - Next.Js',
  description: 'Unofficial representation of a pokedex build with Next.Js 14',
  keywords: 'Pokedex, Next.js, Pokémon, Desenvolvimento Web, React',
  creator: 'Luan Barcaça',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pokedex-barcaca.vercel.app/',
    title: 'Pokedex Barcaca - Next.Js',
    description: 'Unofficial representation of a pokedex build with Next.Js 14',
  },
}

/**
 * Root layout component for the application
 * @param children - React children to be rendered within the layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${raleway.variable}`}>
      <body className="flex min-h-screen w-full flex-col bg-background antialiased">
        <Provider>
          <Header />
          {children}
        </Provider>
        <SpeedInsights />
      </body>
    </html>
  )
}
