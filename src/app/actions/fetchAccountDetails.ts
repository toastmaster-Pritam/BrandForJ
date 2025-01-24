"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function fetchAccountDetails(): Promise<any> {
  const { userId } = await auth();

  

  if (!userId) {
    return {
      error: "User not found!"
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId
      }
    });

    // console.log("user",user)

    return { user };
  } catch (error) {
    return {
      error: "Error fetching user details!"
    };
  }
}
