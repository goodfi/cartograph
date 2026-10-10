import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <main className="auth-screen">
      <Suspense fallback={<p className="text-sm">Loading sign in…</p>}>
        <SignIn />
      </Suspense>
    </main>
  );
}
