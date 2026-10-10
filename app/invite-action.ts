"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";

export type InviteState = { message: string; success: boolean };

export async function inviteMember(_previous: InviteState, form: FormData): Promise<InviteState> {
  const { userId, orgId, has } = await auth.protect();
  if (!orgId || !has({ role: "org:admin" })) {
    return { success: false, message: "Only an organization admin can invite members." };
  }
  // Refuse a stale form if the user switched teams in another tab.
  if (form.get("organizationId") !== orgId) {
    return { success: false, message: "The current organization changed. Reload before inviting." };
  }
  const email = form.get("email");
  if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { success: false, message: "Enter a valid email address." };
  }
  // Next checks same-origin Server Actions; use that origin for the email link.
  const origin = (await headers()).get("origin");
  if (!origin) throw new Error("Invitation requests require an Origin header.");
  const redirectUrl = new URL("/sign-in", origin).toString();
  try {
    const clerk = await clerkClient();
    await clerk.organizations.createOrganizationInvitation({
      organizationId: orgId, inviterUserId: userId,
      emailAddress: email.trim(), role: "org:member", redirectUrl,
    });
    return { success: true, message: `Invitation sent to ${email.trim()}.` };
  } catch (error) {
    console.error("Clerk organization invitation failed", error);
    return { success: false, message: "Clerk could not send the invitation. Try again; if it persists, check the server log." };
  }
}
