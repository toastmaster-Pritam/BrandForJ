"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function deleteUser(userId: string) {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "You need to sign in first!" };
  }

  const role = user?.publicMetadata?.role;

  console.log("role", role);

  if (role !== "admin") {
    return {
      success: false,
      error: "You are not authorized to access the this!"
    };
  }

  const client = await clerkClient();

  await client.users.deleteUser(userId);

  return { success: true, error: null };
}
