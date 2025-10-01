import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Powered Résumé & Portfolio Builder",
  description:
    "Upload your CV or LinkedIn profile to generate a polished, shareable portfolio powered by AI.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "bg-slate-950 text-slate-200 min-h-screen")}
      >
        {children}
      </body>
    </html>
  );
}
