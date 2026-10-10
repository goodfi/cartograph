import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <main className="auth-screen">
      <Suspense fallback={<p className="text-sm">Loading sign up…</p>}>
        <SignUp />
      </Suspense>
    </main>
  );
}
