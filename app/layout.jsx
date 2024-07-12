import { Inter } from "next/font/google";
import AuthProvider from "@/app/components/AuthProvider";
import "./globals.css";
import ".//styles/utils.css";
import Sidebar from "@/app/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

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
    <AuthProvider>
      <html lang="en" className="w-full h-full">
        <head>
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
        <body className={`${inter.className} w-full h-full`}>
          <main className="w-full h-full bg-background">
            <Sidebar />
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
