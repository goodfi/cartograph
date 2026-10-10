import "server-only";

import { auth } from "@clerk/nextjs/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local.",
    );
  }

  const { getToken } = await auth();

  // Keep the client request-scoped and let Clerk supply the current token.
  return createSupabaseClient(url, key, {
    async accessToken() {
      const token = await getToken();

      if (!token) {
        throw new Error("A Clerk session is required to access the database.");
      }

      return token;
    },
  });
}
