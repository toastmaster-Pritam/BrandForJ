import { uploadToCloudinary } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";


export async function POST(req: NextRequest) {
  try {

    const {userId}=await auth()

    if(!userId){
        return new NextResponse("You need to sign in first!",{status:401})
    }

    
    // Parse form data
    const formData = await req.formData();

    const firstName = formData.get("firstName") as string | null;
    const lastName = formData.get("lastName") as string | null;
    const email = formData.get("email") as string;
    const file = formData.get("file") as File | null;

    // Handle file upload
    let avatarUrl = null;
    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const mimeType = file.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = `data:${mimeType};${encoding},${base64Data}`;

      const res = await uploadToCloudinary(fileUri, file.name);
      if (res.success && res.result) {
        avatarUrl = res.result.secure_url;
      } else {
        return NextResponse.json({ message: "File upload failed" }, { status: 500 });
      }
    }

    // console.log(avatarUrl)

    // Update user in the database
    const user = await db.user.update({
      where: { email },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        avatarUrl: avatarUrl || undefined,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user
      
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Failed to update profile", error },
      { status: 500 }
    );
  }
}
