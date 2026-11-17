import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Book For Life — Books That Move You",
  description: "Find your next favourite book at Book For Life."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}