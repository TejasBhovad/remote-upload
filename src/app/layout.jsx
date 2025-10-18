import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Amplitude } from "@/utils/amplitude";

import NavabarWrapper from "@/components/navbar-wrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RemoteUpload",
  description: "Upload files to your computer from anywhere in the world.",
  icons: {
    favicon: "/favicon.ico",
    appleTouchIcon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:alt" content="RemoteUpload" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <Amplitude />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavabarWrapper>{children}</NavabarWrapper>
      </body>
    </html>
  );
}
