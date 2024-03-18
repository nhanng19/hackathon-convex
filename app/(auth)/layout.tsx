import ConvexClientProvider from "@/components/shared/ConvexClientProvider";
import "../globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Fooder | Link up with Foodies",
  description: "Generated by Next.js",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          suppressHydrationWarning={true}
          style={{background: "black"}}
        >
          <Toaster richColors />
          <div className="h-screen flex flex-col justify-center items-center">
            {children}
          </div>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
