import CartProvider from '@/providers/CartProvider'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Footer from './components/footer/Footer'
import NavBar from './components/nav/Navbar'
import './globals.css'

const notoSans = Noto_Sans({ subsets: ['latin', 'vietnamese'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Lava-Shop',
  description: 'Ecommerce app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} text-slate-700`}>
        <Toaster toastOptions={{
          style:{
            background: 'rgb(51 65 85)',
            color: '#fff',
          }
        }}></Toaster>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar></NavBar>
            <main className="flex-grow">
            {children}
            </main>
            <Footer></Footer>
          </div>
        </CartProvider>
        
        
      </body>
    </html>
  )
}

