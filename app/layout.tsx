import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/Header";
import { getAllPosts } from "@/lib/markdown";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();

  return (
    <html lang="en">
      <Head>
        <title>DungNT | Blog</title>
        <meta
          name="description"
          content="Viết lại mọi thứ trong quá trình học lập tình"
        />
        <meta name="og:title" content={"DungNT | Blog"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative lg:flex lg:items-start">
          <Sidebar />
          <MobileHeader posts={posts} />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
