import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ufedo — Frontend Engineer",
  description:
    "Frontend Engineer building scalable, production-ready web products. Based in Abuja, Nigeria.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
