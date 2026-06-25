import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisScrollProvider from "@/components/LenisScrollProvider";

// 1. Configure Fonts — Display, Body, Mono only
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// 2. Viewport Configuration
export const viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// 3. SEO & Social Metadata
export const metadata = {
  title: "Nabeel N — Full-Stack Developer",
  description: "B.Tech Computer Science & Engineering candidate (2021–2025) specializing in Python, Django, React, and PostgreSQL. Building reliable web applications.",
  keywords: [
    "Nabeel N",
    "Full-Stack Developer",
    "Software Engineer",
    "Python Developer",
    "Django",
    "React",
  ],
  authors: [{ name: "Nabeel N" }],
  creator: "Nabeel N",
  metadataBase: new URL("https://nabeeln.vercel.app"),
  openGraph: {
    title: "Nabeel N — Full-Stack Developer",
    description: "B.Tech CSE candidate specializing in Python, Django, React, and PostgreSQL.",
    url: "https://nabeeln.vercel.app",
    siteName: "Nabeel N",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabeel N — Full-Stack Developer",
    description: "Building reliable web applications with Python, Django, and React.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body 
        className="bg-background text-text-secondary font-sans antialiased min-h-screen flex flex-col selection:bg-primary-accent/15 selection:text-white"
      >
        <LenisScrollProvider>
          {children}
        </LenisScrollProvider>
      </body>
    </html>
  );
}