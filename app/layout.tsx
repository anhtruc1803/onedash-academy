import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
  variable: "--font-loaded-display",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  variable: "--font-loaded-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-loaded-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OneDash Academy — Học quản trị server qua 5 nhiệm vụ",
  description: "Nền tảng đào tạo tương tác bằng tiếng Việt về OneDash, có lý thuyết, quiz, dashboard mô phỏng và lưu tiến độ cục bộ.",
  openGraph: {
    title: "OneDash Academy",
    description: "Học OneDash qua 5 chương và 5 nhiệm vụ mô phỏng an toàn.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "OneDash Academy — lộ trình đào tạo quản trị server" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneDash Academy",
    description: "Học OneDash qua 5 chương và 5 nhiệm vụ mô phỏng an toàn.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>{children}</body>
    </html>
  );
}

