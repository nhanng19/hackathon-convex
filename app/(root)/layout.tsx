import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import ConvexClientProvider from "@/components/shared/ConvexClientProvider";
import { Toaster} from "sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fooder | Link up with Foodies",
  description: "A Next.js 13 Social Media App for Foodies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  
    
  return (
    <ConvexClientProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className}>
          <Topbar />
          <Toaster richColors closeButton/>
          <main className="flex flex-row">
            <LeftSidebar />
            {children}
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
        </html>
    </ConvexClientProvider>
  );
}
