import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

// Fonts
const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fouziaoreen.com"),

  title: {
    default: "Fouzia Oreen | Full Stack Developer",
    template: "%s | Fouzia Oreen",
  },

  description:
    "Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, MongoDB, PostgreSQL, AI SaaS applications, and modern web experiences. Explore my projects, portfolio, and development journey.",

  applicationName: "Fouzia Oreen Portfolio",

  keywords: [
    "Fouzia Oreen",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Framer Motion",
    "Portfolio",
    "Developer Portfolio",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack",
    "AI SaaS",
    "Software Engineer",
    "Bangladesh Developer",
  ],

  authors: [
    {
      name: "Fouzia Oreen",
      url: "https://fouziaoreen.com",
    },
  ],

  creator: "Fouzia Oreen",

  publisher: "Fouzia Oreen",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://fouziaoreen.com",
  },

  openGraph: {
    title: "Fouzia Oreen | Full Stack Developer",
    description:
      "Explore the portfolio of Fouzia Oreen — Full Stack Developer building modern web applications, AI SaaS platforms, and production-ready Next.js experiences.",

    url: "https://fouziaoreen.com",
    siteName: "Fouzia Oreen Portfolio",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fouzia Oreen Portfolio",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fouzia Oreen | Full Stack Developer",
    description:
      "Modern Full Stack Developer building AI SaaS applications, Next.js websites, and scalable web platforms.",

    creator: "@yourusername",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "technology",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        fontSans.variable,
        fontMono.variable
      )}
    >
      <body>{children}</body>
    </html>
  );
}