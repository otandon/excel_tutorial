import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TutorialProvider } from '@/context/TutorialContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Excel for Consultants | Interactive Tutorial',
  description:
    'Master Excel skills used by top consultants — from foundations to PivotTables and charts. ~30 minutes, 5 modules, 15 quiz questions.',
  keywords: 'Excel tutorial, Excel for consultants, VLOOKUP, PivotTable, Excel formulas',
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
