"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function AddFreeCredits() {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "You need to sign in first!" };
  }

  const client = await clerkClient();

  await client.users.updateUserMetadata(user.id, {
    publicMetadata: {
      credits: 10
    }
  });

  return { success: true, error: null };
}
