import './globals.css';
import './additional.css';
import type { Metadata } from 'next';
import { CursorMuse } from "@/components/CursorMuse";

export const metadata: Metadata = {
  title: 'DealerTower - Websites Built for Car Shoppers',
  description: 'Top-notch car dealership pages, endless logo apps, and talented designers. Our platform gives dealers control back, delivering the exact experience they want while our experienced buyers actively work the biggest in today\'s digital world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CursorMuse />
        {children}
      </body>
    </html>
  );
}
