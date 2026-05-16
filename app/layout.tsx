import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "참ship다",
  description: "복잡한 도면도, 참ship다로 보면 참 쉽다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className={`min-h-full flex flex-col ${inter.className}`}>{children}</body>
    </html>
  );
}
