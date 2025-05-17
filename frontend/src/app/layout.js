"use client";

import { usePathname } from "next/navigation";
import { Noto_Sans_Thai_Looped } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const notoSansThaiLooped = Noto_Sans_Thai_Looped({
  variable: "--font-base",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = ["/login", "/register"].includes(pathname);

  return (
    <html lang="th" className={notoSansThaiLooped.variable}>
      <body className="font-sans">
        {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
