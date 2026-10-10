import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { InviteForm } from "@/app/invite-form";

export default async function TeamPage() {
  const { orgId, has } = await auth.protect();
  if (!orgId) throw new Error("An active organization is required.");
  return <main className="workspace">
    <div className="workspace-toolbar"><h1>Team</h1><Link href="/">Back to workspace</Link></div>
    <section className="workspace-content">
      <p className="mono">{orgId}</p>
      {has({ role: "org:admin" }) ? <InviteForm organizationId={orgId} key={orgId} /> : <p className="muted">Ask an organization admin to invite a teammate.</p>}
    </section>
  </main>;
}
