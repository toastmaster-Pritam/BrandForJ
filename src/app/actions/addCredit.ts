"use server"
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function AddCredit(userId:string,amount:number) {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "You need to sign in first!" };
  }

  const role = user?.publicMetadata?.role;

  console.log("role", role);

  if (role !== "admin") {
    return {
      success: false,
      error: "You are not authorized to access this!"
    };
  }
  const credits = user?.publicMetadata?.credits===undefined?10:Number(user?.publicMetadata?.credits);

  console.log("old credits",credits)


  const client = await clerkClient();

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      credits: credits+Number(amount)
    }
  });

  return { success: true, error: null };
}
