import { Inter } from "next/font/google";
import AuthProvider from "@/app/components/AuthProvider";
import "./globals.css";
import ".//styles/utils.css";
import Sidebar from "@/app/components/Sidebar";
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
          <link rel="icon" href="/favicon.png" sizes="any" />
        </head>
        <body className={`${inter.className} w-full h-full`}>
          <main className="w-full h-full bg-background">
            <Sidebar />
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
