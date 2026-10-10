"use client";

import { useActionState } from "react";
import { inviteMember } from "@/app/invite-action";

export function InviteForm({ organizationId }: { organizationId: string }) {
  const [state, action, pending] = useActionState(inviteMember, { message: "", success: false });
  return (
    <form action={action} className="invite-form">
      <input type="hidden" name="organizationId" value={organizationId} />
      <label htmlFor="invite-email">Invite a teammate</label>
      <div className="invite-controls">
        <input id="invite-email" name="email" type="email" required maxLength={254} placeholder="teammate@example.com" autoComplete="email" />
        <button disabled={pending} type="submit">{pending ? "Sending…" : "Send invitation"}</button>
      </div>
      <p role="status" className={state.success ? "muted" : "form-error"}>{state.message}</p>
    </form>
  );
}
