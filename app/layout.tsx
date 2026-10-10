import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeControl } from "@/app/theme-control";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cartograph",
  description: "Explore a public repository through its parsed dependencies.",
};

// Before paint, the stored preference must win over the system palette.
const themeScript = `try{const t=localStorage.getItem('cartograph-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:'system'}catch{}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="system" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <ClerkProvider
          signInUrl="/sign-in" signUpUrl="/sign-up"
          signInForceRedirectUrl="/" signUpForceRedirectUrl="/"
          appearance={{ variables: {
            colorPrimary: "var(--accent)",
            colorBackground: "var(--surface)",
            colorForeground: "var(--foreground)",
            colorMuted: "var(--background)",
            colorMutedForeground: "var(--muted)",
            colorInput: "var(--background)",
            colorInputForeground: "var(--foreground)",
            colorBorder: "var(--border)",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "0.8125rem",
            borderRadius: "0.25rem",
          } }}
        >
          <header className="app-header">
            <Link href="/" className="brand">Cartograph</Link>
            <ThemeControl />
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
