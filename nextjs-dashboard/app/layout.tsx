import '@/app/globals.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { siteConfig } from '@/app/lib/config/site';
export const metadata:Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
