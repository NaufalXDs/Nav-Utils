import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme";
import Layout from "@/components/Layout";
import { auth } from "../auth";
// import QueryProvider from "@/components/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NavUtils",
  description: "NavUtils - AdminDashboard",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Layout session={session}>
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
