import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HonoSessionProvider } from "@/providers/HonoSessionProvider";
import { AuthGuard } from "./AuthGuard";
import { Header } from "./header";
import { Footer } from "./footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "review-notes",
  description: "復習ができるメモアプリです。",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        // NOTE: padding-top 8 はヘッダーの高さを考慮
        // NOTE: padding-bottom 16 はフッターの高さを考慮
        // NOTE: ダークモードに設定されているスマホのために text-black と bg-white を指定
        // NOTE: スマホで不要に横スクロールしないように overflow-x-hidden を指定
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-white text-black pt-8 pb-16`}
      >
        <HonoSessionProvider>
          <AuthGuard>
            <Header />
            {children}
            <Footer />
          </AuthGuard>
        </HonoSessionProvider>
      </body>
    </html>
  );
}

declare global {
  interface Array<T> {
    shuffle(seed: number): T[];
  }
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

Array.prototype.shuffle = function <T>(this: T[], seed: number): T[] {
  const shuffled = [...this]; // 新しい配列を作る（元の配列を変更しない）

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    if (shuffled[i] !== undefined && shuffled[j] !== undefined) {
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  }

  return shuffled;
};
