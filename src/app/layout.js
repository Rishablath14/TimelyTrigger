import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'react-hot-toast';
import { dark } from '@clerk/themes';
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Timely Trigger",
  description: "Timely Trigger",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-800`}>
        <ThemeProvider attribute="class"
            defaultTheme="system">
        <Toaster position="top-center"/>
        {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
