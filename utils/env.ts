export function getEnvironment() {
  const values = {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  };
  const missing = Object.entries(values).filter(([, value]) => !value?.trim()).map(([name]) => name);
  if (missing.length) throw new Error(`Missing environment configuration in .env.local: ${missing.join(", ")}`);
  const supabaseUrl = values.NEXT_PUBLIC_SUPABASE_URL!.trim();
  if (!["http:", "https:"].includes(new URL(supabaseUrl).protocol)) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must be an HTTP(S) URL in .env.local.");
  }
  return { supabaseUrl, supabaseKey: values.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!.trim() };
}
