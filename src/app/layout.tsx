import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Acesso',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}
