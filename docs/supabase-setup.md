# Clerk + Supabase

Clerk handles sign-in and session refresh through the existing Next.js proxy.
Supabase is the database. Server code uses `await createClient()` from
`@/utils/supabase/server`; its `accessToken` callback supplies a Clerk session
token for each database request. There is no JWT template named `supabase`,
Supabase Auth cookie handling, or service-role client.

## Dashboard configuration

1. In [Clerk's Supabase integration](https://dashboard.clerk.com/setup/supabase),
   activate the integration and copy the Clerk instance domain. This makes
   session tokens include `role: authenticated`.
2. In the Supabase project `ajrdgrkflxnswcfghgor`, open Authentication →
   Sign In / Providers → Third-party Auth, add Clerk, and paste that domain.
3. Sign in again to obtain a token containing the integration claims.

The project URL and publishable key are in the ignored `.env.local`, alongside
the existing Clerk variables. Restart the development server after changes.
The publishable key does not bypass RLS. No database tables are created here,
and dashboard configuration and authenticated database access remain unverified.

## Database access

Queries belong in server code, must name columns and limit list reads, and must
throw on Supabase errors. The homepage does not query an assumed `todos` table.

When an organization-owned table is specified, its creation migration must
enable RLS in the same transaction. Policies target `authenticated`, compare
the row's organization ID with `auth.jwt()->'o'->>'id'` for Clerk v2 session
tokens, and enforce writes with `WITH CHECK`. Without an active organization
the claim is absent, so access must fail closed. Clerk user IDs are strings;
use `auth.jwt()->>'sub'` rather than UUID-based `auth.uid()` for user identity.
Do not add application filters as a replacement for these policies.

References: [Supabase's Clerk integration](https://supabase.com/docs/guides/auth/third-party/clerk),
[Clerk's integration guide](https://clerk.com/docs/guides/development/integrations/databases/supabase),
[Clerk session token claims](https://clerk.com/docs/guides/sessions/session-tokens).
