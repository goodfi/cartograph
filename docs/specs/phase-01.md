# Phase 01 — Clerk authentication and Supabase database connection

## Behaviour

Clerk remains the only sign-in and session provider. Supabase database requests
run in server code and carry the current Clerk session token through the native
third-party auth integration. A client is created for each request; it is never
shared between users. Missing configuration or a missing session token fails
explicitly. No Supabase Auth session or cookie refresh middleware is introduced.

The supplied Supabase project URL and publishable key are stored locally without
replacing Clerk configuration. The existing homepage and account controls remain.
This setup adds no demonstration tables, data queries, or repository features.

Supabase must trust the Clerk instance before authenticated queries can work.
Future organization-owned tables must enable RLS when created and enforce access
using the organization claim in the token, without application query filters.
Dashboard setup is documented; database connectivity is not claimed until verified.

## Acceptance check (manual)

1. Open the homepage signed out. Existing sign-in and sign-up controls remain.
2. Sign in through Clerk. The account control appears and sign-out still works.
3. In Clerk, activate the Supabase integration. In Supabase, confirm that Clerk
   is configured as a third-party provider with the same Clerk instance domain.
4. Confirm no demo list or Supabase sign-in flow has replaced the homepage.
