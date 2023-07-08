import './globals.css'
import { Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'whetherlike',
  description: 'a website to search for weather',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}</body>
    </html>
  )
}
