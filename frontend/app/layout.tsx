import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from "@/components/theme-provider"
import Navbar from '@/components/navbar';
import Providers from '@/app/providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NONAME',
  description: 'NONAME',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <Navbar />
                {children}
            </ThemeProvider>
          </Providers>
        </body>
      </html>
  )
}
