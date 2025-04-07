import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Shared/menus/Header";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Al-Baraka Fish",
  description: "A Fish store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >

        <Header></Header>
        <Toaster></Toaster>
        <div className="w-[85%] mx-auto ">
          {children}
        </div>

      </body>
    </html>
  );
}
