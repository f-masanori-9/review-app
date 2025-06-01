import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HonoSessionProvider } from "@/providers/HonoSessionProvider";
import { AuthGuard } from "./AuthGuard";
import { Header } from "./header";
import { Footer } from "./footer";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={roboto.variable}>
      <body
        // NOTE: padding-top 8 はヘッダーの高さを考慮
        // NOTE: padding-bottom 16 はフッターの高さを考慮
        // NOTE: ダークモードに設定されているスマホのために text-black と bg-white を指定
        // NOTE: スマホで不要に横スクロールしないように overflow-x-hidden を指定
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-white text-black pt-10 pb-16`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <HonoSessionProvider>
              <AuthGuard>
                <Header />
                {children}
                <Footer />
              </AuthGuard>
            </HonoSessionProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
