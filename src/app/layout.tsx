import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes';

const nunito = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rest Countries API",
  description: "Rest Countries API frontend site made with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${nunitoSans.variable} ${nunito.variable}`}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
