import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Embedded Media Player',
  description: 'A website that embeds multiple media sources in one place',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>VidPlay API</title>
      </head>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
} 