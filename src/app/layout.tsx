import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'InternBridge — Editorial AI Recruitment Platform',
  description:
    'Contemporary AI-powered recruitment platform connecting ambitious students with pioneering companies. Featuring 5 coordinated autonomous agents, deterministic verification, and transparent hiring.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white text-[#080808] antialiased">
      <body className="min-h-full flex flex-col bg-white text-[#080808]">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
