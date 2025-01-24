import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
});

export async function POST(req: Request) {
  try {
    if (!process.env.OPEN_AI_API_KEY) {
      return new NextResponse("Missing Open AI API KEY", { status: 400 });
    }

    const user = await currentUser();
    const client = await clerkClient();

    if (!user) {
      return new NextResponse("You need to sign in first!", { status: 401 });
    }

    const credits = Number(user.publicMetadata?.credits || 0);

    if (!credits) {
      return new NextResponse("You have no credits left!", { status: 402 });
    }

    const { content } = await req.json();
    const aiResponse = await openai.chat.completions.create({
      messages: [{ role: "system", content }],
      model: "chatgpt-4o-latest"
    });

    return NextResponse.json(
      {
        message: "response fetched successfully!",
        aiResponse
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(JSON.stringify(error, null, 2));
    return NextResponse.json(
      {
        message: "Error fetching response from OpenAI"
      },
      { status: 500 }
    );
  }
}
