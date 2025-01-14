import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./reset.css";
import ReactQueryProviders from "@/api/ReactQueryProvider";
import styles from "../styles/layout.module.scss";
import AppHeader from "./components/AppHeader";
import "../styles/globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "minus-blog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable}`}>
        <AppHeader />
        <ReactQueryProviders>
          <div className={styles.wrapper}>{children}</div>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
