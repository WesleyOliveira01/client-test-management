import { ThemeProvider } from "@/components/ui/themeProvider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesh",
  description: "Gerenciamento de clientes com mesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-100 dark:bg-zinc-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
