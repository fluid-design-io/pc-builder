import { Inter } from "@next/font/google";
import { Header } from "../components/Header";

import "./globals.css";
// import "./output.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
