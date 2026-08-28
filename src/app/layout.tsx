import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.deline.top'),
  title: '物与日新 · EVER NEW | Wilson / HachikoJ',
  description: '物与日新：Wilson / HachikoJ 持续构建独立产品、Agent Skills 与开源工具。',
  icons: {
    icon: [{ url: '/brand/ever-new-mark.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/brand/ever-new-mark-192.png', sizes: '192x192', type: 'image/png' }]
  },
  openGraph: {
    title: '物与日新 · EVER NEW | Wilson / HachikoJ',
    description: '物与日新：持续创造，持续打磨。',
    url: 'https://www.deline.top',
    siteName: '物与日新 · Ever New',
    type: 'website',
    images: [{ url: '/brand/ever-new-mark-512.png', width: 512, height: 512, alt: '物与日新 · EVER NEW' }]
  },
  twitter: {
    card: 'summary',
    title: '物与日新 · EVER NEW | Wilson / HachikoJ',
    description: '物与日新：持续创造，持续打磨。',
    images: ['/brand/ever-new-mark-512.png']
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f9fbff'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
