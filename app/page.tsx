import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { InviteForm } from "@/app/invite-form";

export default async function Home() {
  const { orgId, orgSlug, has } = await auth.protect();
  if (!orgId) {
    throw new Error("No active organization. In Clerk Organization settings, require membership and enable Create first organization automatically, then sign in again.");
  }
  return (
    <main className="workspace">
      <div className="workspace-toolbar">
        <h1>Workspace</h1>
        <div className="account-controls">
          <OrganizationSwitcher hidePersonal skipInvitationScreen
            afterSelectOrganizationUrl="/" afterCreateOrganizationUrl="/"
            afterLeaveOrganizationUrl="/"
            organizationProfileMode="navigation" organizationProfileUrl="/team" />
          <UserButton />
        </div>
      </div>
      <section className="workspace-content" aria-label="Organization workspace">
        <div className="organization-context">
          <span className="muted">Current organization</span>
          <p className="mono">{orgSlug ? `${orgSlug} · ` : ""}{orgId}</p>
        </div>
        {has({ role: "org:admin" }) && <InviteForm organizationId={orgId} key={orgId} />}
        <div className="empty-workspace">
          <h2>No repository open</h2>
          <p className="muted">This workspace belongs to your current organization.</p>
        </div>
      </section>
    </main>
  );
}
