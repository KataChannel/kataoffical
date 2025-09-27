import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rau Sạch Trần Gia - Rau Sạch Chất Lượng Cao",
  description: "Cung cấp rau sạch, thực phẩm hữu cơ chất lượng cao. Giao hàng tận nơi, giá cả hợp lý.",
  keywords: "rau sạch, thực phẩm hữu cơ, rau củ quả, giao hàng tận nơi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
