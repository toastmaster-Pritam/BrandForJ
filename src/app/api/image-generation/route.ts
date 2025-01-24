import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  useFileOutput: false
});

export async function POST(req: Request) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error(
        "The REPLICATE_API_TOKEN environment variable is not set."
      );
    }

    const user = await currentUser();
    const client=await clerkClient()

    if (!user) {
      return new NextResponse("You need to sign in first!", { status: 401 });
    }

    const credits =Number(user.publicMetadata?.credits || 0)

    if(!credits){
        return new NextResponse('You have no credits left!',{status:402})
    }
    const { prompt,aspect_ratio } = await req.json();

    const input = {
      prompt,
      aspect_ratio,
    };
    const output: any = await replicate.run("ideogram-ai/ideogram-v2", {
      input
    });

    console.log("Result", output);

    await client.users.updateUserMetadata(user.id,{
        publicMetadata:{
            credits:credits-1
        }
    })

    return NextResponse.json(
      {
        message: "image generated successfully!",
        imageUrl: output
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(JSON.stringify(error, null, 2));
    return NextResponse.json(
      {
        message: "Error fetching response from Replicate!"
      },
      { status: 500 }
    );
  }
}

// import { writeFile } from "node:fs/promises";
// await writeFile("output.png", output);
// //=> output.png written to disk
