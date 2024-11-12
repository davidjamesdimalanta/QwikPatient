import './globals.css';
import Navbar from '@/app/components/Navbar';
import { Inter } from 'next/font/google';
import Providers from './components/Providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="">{children}</main>
        </Providers>
      </body>
    </html>
  );
}