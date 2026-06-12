import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { mono } from "@/lib/fonts";
import { sans } from "@/lib/fonts";
import { SearchCommand } from "@/components/SearchCommand";
import { posts } from "@/lib/search-posts";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${mono.variable} ${sans.variable} bg-stone-100 antialiased transition-colors dark:bg-neutral-950`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          themes={["light", "dark"]}
          disableTransitionOnChange
        >
          <Navbar />
          <SearchCommand posts={posts} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
