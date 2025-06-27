import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/config/redux/provider";
import SnackProvider from "@/providers/snackBar";
import { AppProvider } from "@/initialize";
import { SocketProvider } from "@/providers/socket";
import QueryClientProvider from "@/providers/queryClient";
const poppins = Poppins({
  weight: ["200", "500", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Affiliate",
  description: "Affiliate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${poppins.variable} antialiased overflow-y-scroll`}>
        <ReduxProvider>
          <SocketProvider>
            <SnackProvider>
              <QueryClientProvider>
                <AppProvider>
                  {children}
                </AppProvider>
              </QueryClientProvider>
            </SnackProvider>
          </SocketProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
