# Phase 01 configuration

The application uses Clerk's existing SignIn and SignUp components. All enabled
methods end at `/`. The proxy rejects signed-out requests to protected pages
before page rendering. Server components read the active organization from
`auth()`; they do not fetch a user or organization from Clerk.

## Clerk

In [Organization settings](https://dashboard.clerk.com/last-active?path=organizations-settings),
enable Organizations, require membership, and enable **Create first organization
automatically**. Keep the default creator (`org:admin`) and member (`org:member`)
roles. Automatic creation also applies to users arriving through the existing
Clerk sign-in scaffolding; do not add an application provisioning flow.

Configuration read on 2026-10-10: Organizations are enabled and membership is
required, but automatic first-organization creation is disabled. Enable that
setting before running the phase's acceptance check. Organization slugs are
disabled, so the workspace displays the organization ID from the session token.

Enable Email in Clerk for organization invitation delivery. The application's
invite form uses a Server Action and Clerk's Backend API, setting `redirectUrl`
to this application's `/sign-in`. This is the only Clerk management API call in
application code; workspace rendering and database identity use token claims.
The invite action checks the default admin role and rejects a stale form after
an organization switch. Team management links lead to the app's own invite page,
because Clerk's built-in member invitation UI does not support this redirect.

Sign-in methods remain dashboard configuration. No provider-specific login code
is needed. The Clerk components handle invitation tickets on the existing
sign-in/sign-up routes.

## Environment and database

Required in `.env.local`: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`,
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Blank or missing
values fail at Next configuration load and server startup, naming the missing
variables. The Supabase URL must be HTTP(S).

Follow [Clerk + Supabase setup](supabase-setup.md) to enable the integration and
register Clerk as Supabase's third-party identity provider. Use the ordinary
Clerk session token, whose v2 organization claim is `o.id`. Server-only database
clients require a signed-in session and an active organization, and supply the
token through the `accessToken` callback. No Supabase Auth session refresh,
cookies, tables, or queries are added.

## Theme and checks

System, light, and dark are stored as `cartograph-theme` in local storage and
written to the root's `data-theme` attribute before paint. System mode follows
the media query live; explicit preferences override it. Changes sync across tabs.

Run `pnpm exec tsc --noEmit`, `pnpm lint`, and `pnpm build` before the browser
acceptance check. The browser check remains manual, as specified in phase 01.

References: [Organization configuration](https://clerk.com/docs/guides/organizations/configure),
[Organization invitations](https://clerk.com/docs/guides/organizations/add-members/invitations).
