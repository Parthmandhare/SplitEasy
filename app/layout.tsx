import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SplitEasy - Smart Expense Management',
  description: 'Split expenses effortlessly with friends, family, and colleagues. Track, calculate, and settle up with ease.',
  keywords: 'expense splitting, bill splitting, group expenses, travel expenses, shared costs',
  authors: [{ name: 'Your Name' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
  openGraph: {
    title: 'SplitEasy - Smart Expense Management',
    description: 'Split expenses effortlessly with friends, family, and colleagues.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SplitEasy - Smart Expense Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SplitEasy - Smart Expense Management',
    description: 'Split expenses effortlessly with friends, family, and colleagues.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
          {children}
        </div>
      </body>
    </html>
  )
}