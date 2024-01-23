import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { Providers } from './providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ConnectIn",
  description: "Generated by TechTitans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="h-[70px]">
            <Navbar />
          </div>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
