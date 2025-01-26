"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function fetchBrandDetails(): Promise<any> {
  const { userId } = await auth();

  

  if (!userId) {
    return {
      error: "User not found!"
    };
  }

//   console.log("user id from backend",userId)

  try {
    const details = await db.brandDetails.findUnique({
      where: {
        userId
      }
    });

    // console.log("user",user)

    return { details };
  } catch (error) {
    console.error(JSON.stringify(error,null,2))
    return {
      error: "Error fetching brand details!"
    };
  }
}
