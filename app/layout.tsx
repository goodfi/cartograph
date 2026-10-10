import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cartograph",
  description: "Explore a public repository through its parsed dependencies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <header className="flex min-h-12 items-center justify-between gap-4 border-b border-zinc-200 px-4 text-sm dark:border-zinc-800">
            <Link href="/" className="font-semibold">
              Cartograph
            </Link>
            <nav aria-label="Account" className="flex items-center gap-3">
              <Suspense fallback={<span className="text-zinc-500">Loading account…</span>}>
                <Show when="signed-out">
                  <SignInButton>
                    <button className="cursor-pointer rounded border border-zinc-300 px-3 py-1 dark:border-zinc-700">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="cursor-pointer rounded bg-foreground px-3 py-1 text-background">
                      Sign up
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </Suspense>
            </nav>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
