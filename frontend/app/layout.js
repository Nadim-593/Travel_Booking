import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { AuthProvider } from "@/context/AuthContext";

/*
 * Inter is a professional, highly-legible sans-serif font by Google.
 * It is the industry-standard choice for modern SaaS and travel web apps.
 * subsets: ["latin"] keeps the bundle small — we load only the characters we need.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Prevents invisible text while font loads (FOIT)
});

/*
 * Metadata is exported from layout.js (App Router convention).
 * Next.js injects these values into <head> automatically.
 */
export const metadata = {
  title: {
    default: "Deshiyo Travels — Discover Bangladesh",
    template: "%s | Deshiyo Travels", // e.g. "Sajek Valley | Deshiyo Travels"
  },
  description:
    "Explore the beauty of Bangladesh with Deshiyo Travels. Book verified tour packages to Sajek, Cox's Bazar, Sundarbans, Saint Martin's Island, Sreemangal, and more.",
  keywords: [
    "Bangladesh tour",
    "travel bangladesh",
    "deshiyo travels",
    "sajek valley tour",
    "coxs bazar package",
    "Bangladesh domestic tourism",
  ],
  authors: [{ name: "Deshiyo Travels" }],
  openGraph: {
    title: "Deshiyo Travels — Discover Bangladesh",
    description:
      "Verified domestic tour packages across Bangladesh. Cox's Bazar, Sajek, Sundarbans, Saint Martin, Sreemangal and more.",
    type: "website",
    locale: "en_BD",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="font-[var(--font-inter)] min-h-full flex flex-col bg-white text-slate-900 antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
