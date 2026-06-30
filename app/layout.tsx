import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diploma360",
  description: "Consegui il diploma online con Diploma360",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
