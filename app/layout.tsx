import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TutorialProvider } from '@/context/TutorialContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LACI Excel Workshop | Los Angeles Community Impact',
  description:
    'A training resource by Los Angeles Community Impact. Master Excel skills from foundations to PivotTables and charts. ~30 minutes, 5 modules, 15 quiz questions.',
  keywords: 'Excel tutorial, LACI, Los Angeles Community Impact, VLOOKUP, PivotTable, Excel formulas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TutorialProvider>{children}</TutorialProvider>
      </body>
    </html>
  );
}
