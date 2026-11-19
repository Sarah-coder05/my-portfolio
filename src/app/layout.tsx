import type { Metadata } from "next";
import "./globals.css";
import "./cosmic.css";
import ThemeProvider from "@/components/ThemeProvider";
import Starfield from "@/components/cosmic/Starfield";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Starfield />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
