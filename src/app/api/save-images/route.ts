import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        message: "User not found!"
      },
      {
        status: 400
      }
    );
  }

  const body = await req.json();
  const imageUrls:string[]=body.imageUrls
  console.log("user id",userId)

  console.log("image list",imageUrls)

  try {
    const res = await db.generatedFile.create({
      data: {
        userId,
        fileUrl: imageUrls
      }
    });

    

    return NextResponse.json({
        message:"File stored in db",
        res
    },{
        status:200
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error!"
      },
      {
        status: 500
      }
    );
  }
}
