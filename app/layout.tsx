import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'modern-normalize'; //
import './globals.css';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Manage your personal notes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TanStackProvider>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}