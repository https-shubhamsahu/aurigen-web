import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Aurigen — Build the Future with AI & Robotics",
    template: "%s | Aurigen",
  },
  description:
    "Aurigen is an AI and Robotics company building the next generation of innovators, engineers, creators, and founders through hands-on learning.",
  keywords: [
    "AI education",
    "robotics",
    "hands-on learning",
    "computer vision",
    "STEM",
    "Aurigen",
  ],
  openGraph: {
    title: "Aurigen — Build the Future with AI & Robotics",
    description:
      "An AI and Robotics company building the next generation of innovators through hands-on learning.",
    type: "website",
    siteName: "Aurigen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurigen — Build the Future with AI & Robotics",
    description:
      "An AI and Robotics company building the next generation of innovators through hands-on learning.",
  },
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
