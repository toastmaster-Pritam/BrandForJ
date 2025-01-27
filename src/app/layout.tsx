import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ClerkProvider} from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "BrandForj - Empowering Brands with Bold, Enterprise-Level Design Solutions",
  description:
    "Best AI and functional components to boost your startup",
  alternates: {
    canonical: "/"
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <AdminPanelLayout>
              <ToastContainer />
              
              {children}
            </AdminPanelLayout>
            
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
