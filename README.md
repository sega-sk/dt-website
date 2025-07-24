"# dt-r1" 

## How to Revert to Next.js Optimized Fonts (Recommended)

This project has been configured to use base64-encoded fonts, which can negatively impact performance. For better performance and a better user experience, we recommend using the `next/font` system.

To revert to the optimized `next/font` system, follow these steps:

1.  **Remove the base64 font styles** from `app/additional.css`.
2.  **Restore the `next/font` implementation** in `app/layout.tsx`.

Here’s how to do it:

### 1. Clear Out `app/additional.css`

Remove the `@font-face` and `body { font-family: ... }` rules from this file. It should look like this:

```css
/* Add your custom CSS styles here */
body video.object-cover {
  object-fit: contain;
  background: #fff;
}
```

### 2. Update `app/layout.tsx`

Update your layout file to re-enable `next/font`:

```jsx
import './globals.css';
import './additional.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CursorMuse } from "@/components/CursorMuse";

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <CursorMuse />
        {children}
      </body>
    </html>
  );
}
```

By following these steps, you'll restore the high-performance, optimized font loading that is recommended for all Next.js projects. 
