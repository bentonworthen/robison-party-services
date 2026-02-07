import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Robison Party Services | Nerf Gun Party Rentals | Salt Lake to Provo",
  description: "Epic Nerf battles for your next party! 25 Nerf guns, safety glasses, and free delivery from Salt Lake City to Provo. Book your Nerf party for just $40.",
  keywords: ["Nerf party", "party rental", "Nerf guns", "birthday party", "Utah party", "Salt Lake City", "Provo", "kids party"],
  openGraph: {
    title: "Robison Party Services | Nerf Gun Party Rentals",
    description: "25 Nerf guns delivered to your party for just $40. Serving Salt Lake to Provo!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
