import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RugbyOS — The Club Management Platform for Canadian Rugby',
  description:
    'RugbyOS is the all-in-one platform for managing rugby clubs, teams, players, fixtures, and leagues. Built for Canadian rugby organisations.',
  keywords: 'rugby club management, Canadian rugby, rugby software, rugby platform, team management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
