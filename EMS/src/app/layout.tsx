import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F3F4F9] antialiased`}>
        {/* Yahan koi Sidebar ya Navbar nahi aayega */}
        {children}
      </body>
    </html>
  );
}