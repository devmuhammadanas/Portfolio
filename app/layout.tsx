import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import { Geist } from "next/font/google";

import "./globals.css";

export const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "DevAnas - Full-Stack Developer",
  description: "Welcome to my portfolio! I'm DevAnas, a passionate Full-Stack Developer with expertise in building dynamic and responsive web applications. Explore my projects and skills to see how I can bring your ideas to life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className='h-full antialiased'>
      <body className={`min-h-full flex flex-col ${unbounded.variable} ${geist.variable}`}>{children}</body>
    </html>
  );
}
