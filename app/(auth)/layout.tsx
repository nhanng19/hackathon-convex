import ConvexClientProvider from "@/components/shared/ConvexClientProvider";
import "../globals.css";
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
      <html lang="en">
        <body
          style={{
            backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUG2zJSo8ySvxQDKvmRsLdaaJmRDnUmZDJm52L030FJw&s)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="h-screen flex flex-col justify-center items-center">
            {children}
          </div>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
