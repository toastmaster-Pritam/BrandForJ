"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { BrandDetails } from "../save-brand-info/page";
import { Prisma } from "@prisma/client";

export async function saveBrandDetails(details: BrandDetails): Promise<any> {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: "User not found!"
    };
  }

  try {
    const existingBrand = await db.brandDetails.findUnique({
      where: {
        userId
      }
    });

    if (existingBrand) {
      await db.brandDetails.update({
        where: {
          userId
        },
        data: {
          details: details as unknown as Prisma.InputJsonValue
        }
      });

      return {
        success: true,
        message: "Brand details updated successfully!"
      };
    } else {
      await db.brandDetails.create({
        data: {
          userId,
          details: details as unknown as Prisma.InputJsonValue
        }
      });

      return {
        success: true,
        message: "Brand details saved successfully!"
      };
    }
  } catch (error) {
    console.error("Error saving brand details:", error);
    return {
      error: "Failed to save brand details. Please try again later."
    };
  }
}
