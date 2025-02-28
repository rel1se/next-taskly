import type { Metadata } from "next";
import "./globals.css";
import {siteConfig} from "@/config/site";


export const metadata: Metadata = {
  title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
    icons: [
        {
            url: "/logo.svg",
        }
    ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="h-full"
      >
        {children}
      </body>
    </html>
  );
}
