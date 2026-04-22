import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LangProvider } from "./lib/LangContext";
import ChatWidget from "./components/ChatWidget";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "The Way English School | Online English Courses with Live Classes",
  description:
    "The Way English School - Online English courses with live classes from beginner to advanced levels. Achieve your personal and professional dreams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-lang="en">
      <body className={plusJakarta.variable}>
        <LangProvider>
          {children}
          <ChatWidget />
        </LangProvider>
      </body>
    </html>
  );
}
