import "server-only";

import { auth } from "@clerk/nextjs/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getEnvironment } from "@/utils/env";

export async function createClient() {
  const { supabaseUrl, supabaseKey } = getEnvironment();
  const { getToken, orgId } = await auth.protect();
  if (!orgId) throw new Error("An active Clerk organization is required to access the database.");

  // Keep the client request-scoped and let Clerk supply the current token.
  return createSupabaseClient(supabaseUrl, supabaseKey, {
    async accessToken() {
      const token = await getToken();

      if (!token) {
        throw new Error("A Clerk session is required to access the database.");
      }

      return token;
    },
  });
}
