import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "IT Croatia",
    template: "%s | IT Croatia",
  },
  description:
    "Collection of IT companies, startups, agencies, and consultancies in Croatia",
  keywords: [
    "IT",
    "Croatia",
    "IT Croatia"
  ],
  authors: [{ name: "IT Croatia" }],
  openGraph: {
    title: "IT Croatia",
    description:
      "Collection of IT companies, startups, agencies, and consultancies in Croatia",
    url: "https://it-croatia.com",
    siteName: "IT Croatia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "IT Croatia",
    description:
      "Collection of IT companies, startups, agencies, and consultancies in Croatia",
  },
  metadataBase: new URL("https://it-croatia.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "633ab3204ab2411489ed5189e20e1aa3"}'
        />
      </body>
    </html>
  );
}
