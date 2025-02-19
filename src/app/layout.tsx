import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Web3Provider from "@/providers/Web3Provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NFT Mint",
  description:
    "Create and mint your own unique NFTs on the blockchain. Simple, secure, and decentralized.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          background: "linear-gradient(90deg, #000000 0%, #111827 100%)",
        }}
        className={`min-h-screen flex flex-col ${inter.className} antialiased`}
      >
        <Web3Provider>
          <header className="sticky top-0 z-50 ">
            <Navbar />
          </header>
          <main className="w-full flex-grow overflow-hidden">{children}</main>
        </Web3Provider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              border: "1px solid #E4E7EC",
              borderRadius: 15,
              padding: "16px",
              color: "#000",
              fontSize: 15,
              fontWeight: 400,
            },
            duration: 2000,
          }}
        />
      </body>
    </html>
  );
}
